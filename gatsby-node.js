const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const glob = require("glob");
const fs = require("fs");

const defaultConfig = {
  defaultSizes: "parsed",
  excludeAssets: "render-page.js"
};

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  if (stage === "build-javascript") {
    const { plugins, ...analyzerConfig } = options;

    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          ...defaultConfig,
          ...analyzerConfig
        })
      ]
    });
  }
};

exports.onPostBuild = ({ reporter }) => {
  const results = glob.sync(`public/**/!(404|report).html`);

  // reporter.info(JSON.stringify(results, null, 2));

  const data = results.map(file => {
    return { path: file, stats: fs.statSync(file) };
  });

  // reporter.info(JSON.stringify(data, null, 2));

  // data.forEach((file) => {
  //   reporter.info(`${file.path} - ${file.stats.size / 1000.0} K`);
  // });

  const sizes = data
    .filter(({ path }) => !path.includes("offline-plugin-app-shell-fallback"))
    .map(({ stats: { size } }) => size);

  const sumResult = sizes.reduce((a, b) => a + b, 0);

  const averagePageSize = sumResult / sizes.length / 1000.0;

  reporter.info(`Average static page size for the build: ${averagePageSize}KB`);
};
