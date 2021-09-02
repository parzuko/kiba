#!/usr/bin/env bash

# Java 15.0.2 Installation Steps

curl "https://download.java.net/java/GA/jdk15.0.2/0d1cfde4252546c6931946de8db48ee2/7/GPL/openjdk-15.0.2_linux-x64_bin.tar.gz" -o java.tar.gz

tar xzf java.tar.gz --strip-components=1
rm java.tar.gz
