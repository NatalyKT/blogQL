start:
	node index.js

install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint . --fix
	
.PHONY: test