
define(function (require) {
  return function boxplotViolinProvider(Private, Notifier) {
    var _ = require('lodash');
    var arrayToLinkedList = require('ui/agg_response/hierarchical/_array_to_linked_list');

    var notify = new Notifier({
      location: 'Boxplot Violin chart response converter'
    });

    var nodes = [];

    return function (vis, resp) {

        var metric = vis.aggs.bySchemaGroup.metrics[0];
        var children = vis.aggs.bySchemaGroup.buckets;
        children = arrayToLinkedList(children);

        var firstAgg = children[0];
        var aggData = resp.aggregations[firstAgg.id];

        var max_value = 0;
        var min_value = 0;
        var bool_first = true;

        nodes = [];

        var id_aggregation = children[1].id;

        var labels = null;

        try {
            labels = JSON.parse(vis.params.jsonLabels); //[ { 'text' : 'CUENTA'} ]
        } catch (e) {
            labels = "";
        }

        var pos = 0;

        var aggs = [];
        _.each(aggData.buckets, function (d, i) {

            var results = [];
            var min = 0;
            var max = 0;

            if (d[id_aggregation])
            {
                if (d[id_aggregation].buckets) {

                    var ordered_results = d[id_aggregation].buckets.sort(d3.ascending);
                    max = ordered_results[ordered_results.length-1].key;
                    min = ordered_results[0].key;

                    _.each(d[id_aggregation].buckets, function(d1, i1) {

                        for(var t=0; t < d1.doc_count; t++) {
                            results.push(d1.key);
                        }


                    });

                    if (bool_first) {
                        max_value = max;
                        min_value = min;
                        bool_first = false;
                    }
                    else {
                        if (min < min_value) min_value = min;
                        if (max > max_value) max_value = max;
                    }
                }
            }

            var textLabel = d.key;

            if (labels.length > pos)
            {
                textLabel = (labels[pos].text ? labels[pos].text : textLabel);
            }

            nodes.push({ 'boxplot_key' : d.key, 'textLabel' : textLabel, 'results' : results });

            pos++;
        });

        var chart = {
            'max_value' : max_value,
            'min_value' : min_value,
            'data': nodes
        };

        return chart;
    };
  };
});
