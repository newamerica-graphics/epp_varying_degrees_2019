# Varying Degrees

Varying degrees for 2018 on, using [Teddy](https://github.com/newamericafoundation/teddy) and the [data-viz-boilerplate](https://github.com/newamericafoundation/data-viz-boilerplate). Each year has a branch named for that year.

2017 version: [varying-degrees](https://github.com/newamericafoundation/varying-degrees) and [varying-degrees-backend](https://github.com/newamericafoundation/varying-degrees-backend)

## Deployment

- Make sure you have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) configured properly on your machine. If you have Homebrew installed, run `brew update && brew install awscli` and then `aws configure` and finally `aws configure set preview.cloudfront true`
- Make sure you have renamed your project in `package.json`.
- Run `npm run deploy`
- All deployments are cached by AWS cloudfront and available at [https://data.newamerica.org/](https://data.newamerica.org/) and on s3 [here](http://datadotnewamerica.s3-website-us-east-1.amazonaws.com/).

## Notes

- `React`, `ReactDOM`, `ReactRedux`, and `Redux` are all globally scoped on newamerica.org, and defined as externals within this repo's [webpack config](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/webpack.config.js). There is no need to install or bundle those dependencies if the graphic will exist exclusively on newamerica.org.

- Critical styles from newamerica.org are included in the head. This includes all [fonts](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_fonts.scss) and [type styles](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_type.scss), [bootstrap columns](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_bootstrap-grid-critical.scss), [margins](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_margins.scss), and [containers](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_containers.scss).
