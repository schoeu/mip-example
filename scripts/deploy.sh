#/bin/sh

script_path=$(cd `dirname $0` && pwd)
ext_name=mip-extensions
ext_name_plat=mip-extensions-platform
github_ext=https://github.com/mipengine/$ext_name.git
github_ext_plat=https://github.com/mipengine/$ext_name_plat.git

ext_code_path=$1
ext_path=$ext_code_path/$ext_name
ext_plat_path=$ext_code_path/$ext_name_plat

if [ -d "$ext_code_path" ];
then
    if [[ -d "$ext_path" && -d "$ext_plat_path" ]];
    then
        cd $ext_path
        git pull
        cd $ext_plat_path
        git pull
    fi
else
    mkdir -p $ext_code_path
    cd $ext_code_path

    git clone $github_ext
    git clone $github_ext_plat
fi
