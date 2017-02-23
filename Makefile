include n.Makefile

unit-test:
	mocha --recursive --reporter spec tests

demo-build:
	@node-sass demos/src/main.scss --include-path bower_components --output public/
	@$(DONE)

demo: demo-build
	@node demos/app

a11y: demo-build
	@node .pa11yci.js
	@PA11Y=true node demos/app
	@$(DONE)

test: verify unit-test a11y
