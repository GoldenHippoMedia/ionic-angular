## GH ionic-angular 3.9.4 Fork

Fork created by Morley.

In use by ActivatedYou-v1.24-PCI at the time of writing.

- DEV-3140: Fixes an issue preventing clicking on any non-ionic element before
clicking on an ionic-angular first after page load

## Ionic Framework

The official npm package for [Ionic](https://ionicframework.com/), complete with pre-built ES5 bundles, TypeScript definitions, Sass files, CommonJS ES5 files, and more.

To get started with Ionic, please read the [Installation Guide](https://ionicframework.com/docs/intro/installation/).

[Ionic Documentation](https://ionicframework.com/docs/)

### Source files

In the root of the package are ES5 sources in the CommonJS module format, their associated Typescript type definition files, and the Ionic Sass entry files. The Javascript sources are meant to be used by a bundler such as Webpack, SystemJS Builder, or Browserify. The type definitions provide support to Typescript tooling for things like type checking and code completion.

Usually, the only import required by the user is `ionic-angular`, as everything from Ionic is exported by the package:

```
  import { App, NavController } from 'ionic-angular';
```

### Bundles

Minified and unminified CommonJS and System.register module format bundles, as well as compiled CSS stylesheets for both Ionic iOS and Material Design are located `bundles/`. The SystemJS bundle is  primarily meant to be included in a `<script>` tag for demos, tests and Javascript playgrounds like [Plunker](https://plnkr.co/).

### Installation and More

To use Ionic, we recommend installing and utilizing the [Ionic CLI](https://ionicframework.com/docs/intro/installation/) which will help you create pre-configured Ionic apps.

For full instructions on using Ionic, please visit the [Ionic Documentation](https://ionicframework.com/docs/)
