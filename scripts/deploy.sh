#/bin/sh

script_path=$(cd `dirname $0` && pwd)
ext_name=$2
mip_name=$3
mipengine_url=https://github.com/mipengine/
github_ext=$mipengine_url$ext_name.git
github_ext_mip=$mipengine_url$mip_name.git

ext_code_path=$1
ext_path=$ext_code_path/$ext_name
ext_plat_path=$ext_code_path/$mip_name

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
    git clone $github_ext_mip
fi
