# How to migrate from heatmap.js v1.0 to v2.0

This document will describe the major public API changes and how you have to adapt your code to make your project work with heatmap.js v2.0

## element -> container
I thought this would describe the config property better, now the element property should be called container property:

```javascript

var cfg = {
   "container": domElement
};

```


## opacity -> maxOpacity
With the new heatmap.js v2.0 the opacity config property is affecting the global opacity (it sets the opacity for all datapoints and prevents smooth gradients). If you want to achieve smooth datapoint gradients you now have to use the maxOpacity config property:

```javascript

var cfg = {
   "maxOpacity": .8
}
```

Also, opacity, maxOpacity, and minOpacity should now be a decimal number within [0,1].


## Feeding heatmap.js with data

I decided to reduce the API to a more flat structure. That means you don't have to access the datastore of a heatmap to add the data but rather can add the new data directly at your heatmap instance. I also got rid of naming redundance ( `heatmap.store.addDataPoint` -> `heatmap.addData`, `heatmap.store.setDataSet` -> `heatmap.setData`).

```javascript
var datapoint = { x: 100, y: 100, value: 10 };

heatmap.addData(datapoint);

heatmap.setData({
   max: 10,
   data: [datapoint]
});
```

Also, as you probably have noticed: the count property of a datapoint is now called value by default BUT for migration sake you can tell heatmap.js to use "count" as a valueField:


```javascript
var datapoint = { x: 100, y: 100, count: 10 };

var heatmap = h337.create({
   container: domElement,
   // ...
   valueField: 'count'
});

heatmap.addData(datapoint);

heatmap.setData({
   max: 10,
   data: [datapoint]
});
```

---

# Summary

Old configuration example:

```javascript

var cfg = {
   "element": domElement,
   "opacity": 80
}

var heatmap = h337.create(cfg);

heatmap.store.setDataSet(data);
```

turns into new configuration:

```javascript

var cfg = {
   "container": domElement,
   "maxOpacity": .8
}

var heatmap = h337.create(cfg);

heatmap.setData(data);
```

Have a look at the documentation (it's inside the repo at /docs/) to see the full API