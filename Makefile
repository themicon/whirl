help:
	@grep -E '^[a-zA-Z\._-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# target that checks for pen to be set
checkWhirl:
ifndef NAME
	$(error Name not set!!!)
endif

checkRequired:
ifndef REQUIRED
	$(error Required number of elements not set!!!)
endif

create-whirl: checkWhirl checkRequired ## creates a new whirl file and adds it to config
	node add-whirl.js --name $(NAME) --required $(REQUIRED) && gulp markup:compile
