# This file contains a make script for the XSSAddr application
#
# Author: Josh McIntyre
#

# This block defines makefile variables
SRC_CLIENT_FILES=src/client/*
TEST_FILES=tests/*

BUILD_DIR=bin/xssaddr

# This rule builds the application
build: $(SRC_CLIENT_FILES) $(TEST_FILES)
	mkdir -p $(BUILD_DIR)
	cp $(SRC_CLIENT_FILES) $(BUILD_DIR)
	cp $(TEST_FILES) $(BUILD_DIR)

# This rule cleans the build directory
clean: $(BUILD_DIR)
	rm $(BUILD_DIR)/*
	rmdir $(BUILD_DIR)
