# JSON Differences

It finds out the differences between two JSONs

## Installation

```bash
npm install json-differences
```

## Usage
In JS
```javascript
var JSONDifferences = require("json-differences");

var jsonDiffer = new JSONDifferences.default();

var _old = {
    'id': 15,
    'boo': 'baa',
    'laa': 'lii'
};
var _new = {
    'id': 15,
    'boo': 'bee',
    'jaa': 'joo'
};

var diff = jsonDiffer.getJsonDiff(_old, _new);

console.log(diff);
```

in TS

```typescript
import JsonDiffer from 'json-differences';

const jsonDiffer = new JsonDiffer();

const _old = {
    'id': 15,
    'boo': 'baa',
    'laa': 'lii'
};

const _new = {
    'id': 15,
    'boo': 'bee',
    'jaa': 'joo'
};

const diff = jsonDiffer.getJsonDiff(_old , _new);

console.log(diff);
```

## Output

```typescript
{
  new: {
    jaa: 'joo'
  },
  updated: {
    boo: {old: 'baa', new: 'bee' } 
  },
  deleted: {
    laa: 'lii' 
  }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.