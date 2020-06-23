class Handler {
    canHandle(key){
        return this.key == key;
    }

    apply(input, target){
        throw new Error('Method must be implemented');
    }
}
class AllOfHandler extends Handler {
    constructor(options) { 
        super();
        this.key = 'allOf'
    }

    apply(input, target){
        
        var result = input.every(i=>{
        
            return target.includes(i);
        })

        return {
            e: this.key + ' fail ['+input+'] vs ['+ target+']',
            v: result
        }                
    }
}
class AnyOfHandler extends Handler {
    constructor(options) { 
        super();
        this.key = 'anyOf'
    }

    apply(input, target){
        var result = input.some(i=>{
            return target.includes(i);
        })

        return {
            e: this.key + ' fail ['+input+'] vs ['+ target+']',
            v: result
        }                
    }
}

class NoneOfHandler extends Handler {
    constructor(options) { 
        super();
        this.key = 'noneOf'
    }

    apply(input, target){
        var result = !input.some(i=>{
            return target.includes(i);
        })

        return {
            e: this.key + ' fail ['+input+'] vs ['+ target+']',
            v: result
        }                
    }
}

class YpFilterChainable {
    constructor(options) { 
        this.operands = [];
        this.handlers = [
            new AllOfHandler(),
            new AnyOfHandler(),
            new NoneOfHandler()
        ]           
    }

    allOf(ips){
        this.operands.push({k: 'allOf', v:ips})
        return this;
    }
    anyOf(ips){
        this.operands.push({k: 'anyOf', v:ips})
        return this;
    }
    noneOf(ips){
        this.operands.push({k: 'noneOf', v:ips})
        return this;
    }

    _findHandler(key){
        var result = undefined;
        this.handlers.forEach(handler=>{
            if(handler.canHandle(key))
                result = handler;            
        })
        return result;
    }

    check(ipsArray){
        var self = this;
        var result = true;
        var errors = [];
        
        this.operands.forEach(operand=>{
            var handler = self._findHandler(operand.k);
            var handlerResult = handler.apply(ipsArray, operand.v);
            result = result && handlerResult.v;
            if(!handlerResult.v) errors.push(handlerResult.e);
        })

        return {
            r: result,
            e: errors
        };
    }

}
class YpFilter {
    constructor(options) {       
    }
    /**
     * @returns Chainable
     */
    create(){
        var chainable = new YpFilterChainable();
        return chainable;
    }
}
module.exports = {
    YpFilter: new YpFilter({}),
    Handler: Handler,
    AllOfHandler: AllOfHandler,
    AnyOfHandler: AnyOfHandler,
    NoneOfHandler: NoneOfHandler
};