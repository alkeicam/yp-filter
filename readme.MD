# yp-filter
> Simple library to make ip acl checks

## Setup
```javascript
const {YpFilter} = require('yp-filter');
var filter = YpFilter.create().anyOf(someTargetIpsArray);
```

## Operands
|Name| Description | 
| :--- | :--- | 
|`anyOf()`| any item of ip array that is under check must be contained in this array | 
|`allOf()`| all items of ip array that is under check must be contained in this array | 
|`noneOf()`| no item of ip array that is under check must be contained in this array | 


## Examples

### Sample 1 - weak ip check
```javascript
var whitelist  = ['192.168.1.1','192.168.1.2']

var ipsFromRequest = ['10.12.12.9','192.168.1.1'] // this is a list of ips from some request

// we want to make sure, that at least one IP that is the source of the connection is on the whitelist
var filter = YpFilter.create().anyOf(whitelist);

return filter.check(ipsFromRequest); // will retur TRUE as one of the ips from request is on the whitelist, i.e. '192.168.1.1'

```

### Sample 2 - strong ip check
```javascript
var whitelist  = ['192.168.1.1','192.168.1.2']

var ipsFromRequest = ['10.12.12.9','192.168.1.1'] // this is a list of ips from some request

// we want to make sure, that at all IPs that are the source of the connection are on the whitelist
var filter = YpFilter.create().allOf(whitelist);

return filter.check(ipsFromRequest); // will retur FALSE as one of the ips from request is not on the whitelist, i.e. '10.12.12.9'

```
