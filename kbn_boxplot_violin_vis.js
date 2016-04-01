define(function (require) {
  require('ui/agg_table');
  require('ui/agg_table/agg_table_group');

  require('plugins/kbn_boxplot_violin_vis/kbn_boxplot_violin_vis.less');
  require('plugins/kbn_boxplot_violin_vis/kbn_boxplot_violin_vis_controller');

  require('ui/registry/vis_types').register(KbnBoxplotViolinVisProvider);

  function KbnBoxplotViolinVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    return new TemplateVisType({
      name: 'kbn_boxplot_violin',
      title: 'Boxplot Violin Diagram',
      icon: 'fa-table',
      description: 'Cool D3 Boxplot (With Violin) chart',
      template: require('plugins/kbn_boxplot_violin_vis/kbn_boxplot_violin_vis.html'),
      params: {
        defaults: {
          showText: true,
          showValues: true,
          showMetricsAtAllLevels: false
        },
        editor: require('plugins/kbn_boxplot_violin_vis/kbn_boxplot_violin_vis_params.html')
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Parameter',
          min: 1,
          max: 1,
          defaults: [
            {type: 'count', schema: 'metric'}
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Boxplot Gropuing',
          aggFilter: '!geohash_grid',
          min: 0,
          max: 2
        }
      ]),
      requiresSearch: true
    });
  }

  // export the provider so that the visType can be required with Private()
  return KbnBoxplotViolinVisProvider;
});
