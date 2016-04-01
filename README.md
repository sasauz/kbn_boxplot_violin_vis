# WARNING - NOT WORKING - WILL BE IN A WHILE - STAY TUNED

# Kibana BoxPlot Visualization Plugin

This is a BoxPlot diagram visType for Kibana, version 4.4.1.

This plugin is based on the exceptional D3 library,
by @mbostock [D3 Gallery](http://bl.ocks.org/mbostock/4061502) (Thanks!).

If you really liked this and feel like making a donation : <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=juan.carniglia@gmail.com&lc=AR&item_name=JuanCarniglia&item_number=1004&currency_code=USD&bn=PP-DonationsBF:btn_donate_LG.gif:NonHosted">
<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" alt="Contribute!" />
</a>

![Screenshot]()

##Installation Steps

(Theses are optional, you can just copy the kbn_boxplot_vis folder into
KIBANA_HOME/src/plugins) and run kibana.

```
git clone https://github.com/JuanCarniglia/kbn_boxplot_vis.git
cd kbn_boxplot_vis
npm install
npm run build
cp -R build/kbn_boxplot_vis/ KIBANA_HOME/installedPlugins
```

##How does it work

Basically, this plugin takes the information from Elasticsearch, generates a JSON structure, which is:

```json
{}
```
