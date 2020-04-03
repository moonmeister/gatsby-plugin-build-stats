# gatsby-plugin-build-stats

Gives you various build stats when you run `gatsby build`. 

## TODO:

Works but needs more work before it is ready for general availability. 

-[] Handle webpack defaults that need to be merged not overridden.
-[] decide best defaults for webpack output
-[] testing?
-[] Write anything to console concerning JS bundle??
-[] any other HTML file stats?
-[] Write those docs!!


## Config

  ```js
  // dev tools
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        analyzerMode: 'static',
        openAnalyzer: false,
      },
    },
```