// Chai is a commonly used library for creating unit test suites. It is easily extended with plugins.
const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;
const expect = chai.expect;

// Sinon is a library used for mocking or verifying function calls in JavaScript.
const sinon = require('sinon');


const {YpFilter:theModule, Handler, AllOfHandler, AnyOfHandler, NoneOfHandler} = require('../');

describe('yp-filter', () => {
    describe('Handler', () => {
        beforeEach(() => {   
            clazz = class Clazz extends Handler{
                constructor(options) { 
                    super();
                    this.key = 'key'
                }
            };  
            handler = new clazz();       
        });
        afterEach(() => {
        });                
        it('can handle negative', () => {            
            return expect(handler.canHandle('some')).is.false;
        })
        it('can handle positive', () => {            
            return expect(handler.canHandle('key')).is.true;
        })
        it('apply must be implemented', () => {            
            return expect(handler.apply).to.throw('Method must be implemented')
        })
    })
    describe('AllOfHandler', () => {
        let IN_1 = ['a','b']
        let T_1 = ['a']
        let T_2 = ['a','c','d']
        let T_3 = []
        let T_4 = ['x','y']
        let T_5 = ['b','a']
        let T_6 = ['x','b','a']
        beforeEach(() => {               
            handler = new AllOfHandler();       
        });
        afterEach(() => {
        });                
        it('negative 1', () => {            
            return expect(handler.apply(IN_1, T_1).v).is.false;
        })
        it('negative 2', () => {            
            return expect(handler.apply(IN_1, T_2).v).is.false;
        })
        it('negative 3', () => {            
            return expect(handler.apply(IN_1, T_3).v).is.false;
        })
        it('negative 4', () => {            
            return expect(handler.apply(IN_1, T_4).v).is.false;
        })
        it('positive 1', () => {            
            return expect(handler.apply(IN_1, T_5).v).is.true;
        })
        it('positive 2', () => {            
            return expect(handler.apply(IN_1, T_6).v).is.true;
        })
        
    })
    describe('AnyOfHandler', () => {
        let IN_1 = ['a','b']
        let T_1 = ['a']
        let T_2 = ['a','c','d']
        let T_3 = []
        let T_4 = ['x','y']
        let T_5 = ['b','a']
        let T_6 = ['x','b','a']
        beforeEach(() => {               
            handler = new AnyOfHandler();       
        });
        afterEach(() => {
        });                
        it('positive 1', () => {            
            return expect(handler.apply(IN_1, T_1).v).is.true;
        })
        it('positive 2', () => {            
            return expect(handler.apply(IN_1, T_2).v).is.true;
        })
        it('negative 1', () => {            
            return expect(handler.apply(IN_1, T_3).v).is.false;
        })
        it('negative 2', () => {            
            return expect(handler.apply(IN_1, T_4).v).is.false;
        })
        it('positive 3', () => {            
            return expect(handler.apply(IN_1, T_5).v).is.true;
        })
        it('positive 4', () => {            
            return expect(handler.apply(IN_1, T_6).v).is.true;
        })
        
    })
    describe('NoneOfHandler', () => {
        let IN_1 = ['a','b']
        let T_1 = ['a']
        let T_2 = ['a','c','d']
        let T_3 = []
        let T_4 = ['x','y']
        let T_5 = ['b','a']
        let T_6 = ['x','b','a']
        beforeEach(() => {               
            handler = new NoneOfHandler();       
        });
        afterEach(() => {
        });                
        it('positive 1', () => {            
            return expect(handler.apply(IN_1, T_1).v).is.false;
        })
        it('positive 2', () => {            
            return expect(handler.apply(IN_1, T_2).v).is.false;
        })
        it('positive 3', () => {            
            return expect(handler.apply(IN_1, T_3).v).is.true;
        })
        it('positive 4', () => {            
            return expect(handler.apply(IN_1, T_4).v).is.true;
        })
        it('negative 1', () => {            
            return expect(handler.apply(IN_1, T_5).v).is.false;
        })
        it('negative 2', () => {            
            return expect(handler.apply(IN_1, T_6).v).is.false;
        })
        
    })
    
    describe('create', () => {
        beforeEach(() => {            
        });
        afterEach(() => {
        });                
        it('create', () => {
            return expect(theModule.create()).is.not.undefined;            
        })
    })  
    describe('YpFilterChainable', () => {
        describe('core',()=>{
            let TARGET = ['10.10.1.1']
            beforeEach(() => {            
                check = theModule.create();
            });
            afterEach(() => {
            });                
            it('allOf', () => {
                return expect(check.allOf(TARGET)).is.not.undefined;                
            })
            it('allOf operands check', () => {
                return expect(check.allOf(TARGET).operands[0].k).eq('allOf');                
            })
            it('allOf operands check 2', () => {
                return expect(check.allOf(TARGET).operands[0].v).eq(TARGET);                
            })
            it('anyOf', () => {
                return expect(check.anyOf(TARGET)).is.not.undefined;                
            })
            it('anyOf operands check', () => {
                return expect(check.anyOf(TARGET).operands[0].k).eq('anyOf');                
            })
            it('anyOf operands check 2', () => {
                return expect(check.anyOf(TARGET).operands[0].v).eq(TARGET);                
            })
            it('noneOf', () => {
                return expect(check.noneOf(TARGET)).is.not.undefined;                
            })
            it('noneOf operands check', () => {
                return expect(check.noneOf(TARGET).operands[0].k).eq('noneOf');                
            })
            it('noneOf operands check 2', () => {
                return expect(check.noneOf(TARGET).operands[0].v).eq(TARGET);                
            })
            it('chaining 1', () => {
                return expect(check.noneOf(TARGET).anyOf(TARGET).operands[0].v).eq(TARGET);                
            })
            it('chaining 2', () => {
                return expect(check.noneOf(TARGET).anyOf(TARGET).operands[0].k).eq("noneOf");                
            })
            it('chaining 3', () => {
                return expect(check.noneOf(TARGET).anyOf(TARGET).operands[1].v).eq(TARGET);                
            })
            it('chaining 4', () => {
                return expect(check.noneOf(TARGET).anyOf(TARGET).operands[1].k).eq("anyOf");                
            })
            it('find 1', () => {
                return expect(check._findHandler('allOf')).is.not.undefined;            
            })
            it('find 2', () => {
                return expect(check._findHandler('anyOf')).is.not.undefined;            
            })
            it('find 3', () => {
                return expect(check._findHandler('noneOf')).is.not.undefined;            
            })
            it('find 4', () => {
                return expect(check._findHandler('other')).is.undefined;            
            })
        })
        describe('check',()=>{
            // ['p1','p2','o1']
            // [tpr1]
            // [tp1]
            // ypFilter.anyOf([tpr1]).anyOf([tp1]).allOf([tp1, tpr1]).check(['p1','p2','o1'])
            let TARGET_1 = ['a']
            let TARGET_2 = ['a','b']
            let TARGET_3 = ['h','g']
            let INPUT_1 = ['b','g']
            beforeEach(() => {            
                ypFilter = theModule.create();                                
            });
            afterEach(() => {
            }); 
            it('check - no operands',()=>{                
                return expect(ypFilter.check(INPUT_1).r).is.true;
            })
            it('check - single operand true',()=>{  
                ypFilter = ypFilter.anyOf(TARGET_2);              
                return expect(ypFilter.check(INPUT_1).r).is.true;
            })
            it('check - single operand true 2',()=>{  
                ypFilter = ypFilter.anyOf(TARGET_2);              
                return expect(ypFilter.check(INPUT_1).e.length).eq(0);
            })
            it('check - single operand false',()=>{  
                ypFilter = ypFilter.anyOf(TARGET_1);              
                return expect(ypFilter.check(INPUT_1).r).is.false;
            })
            it('check - single operand false 2',()=>{  
                ypFilter = ypFilter.anyOf(TARGET_1);              
                return expect(ypFilter.check(INPUT_1).e.length).eq(1);
            })
            it('check - multiple operand true',()=>{  
                ypFilter = ypFilter.anyOf(TARGET_2).anyOf(TARGET_3).noneOf(TARGET_1);              
                return expect(ypFilter.check(INPUT_1).r).is.true;
            })
        })
        
    })       
})
