'use strict';

module.exports = function(kibana){

	return new kibana.Plugin({
		name: 'kbn_boxplot_violin_vis',
		require: ['kibana'],
		uiExports: {
			visTypes: [
				'plugins/kbn_boxplot_violin_vis/kbn_boxplot_violin_vis'
				]
			}
	});
};
