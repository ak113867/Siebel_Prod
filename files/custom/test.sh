FilePath=$1
OutputFilePath=$2
JarFilePath=$3
Timestamp=$(date +"%N-%m-%S%m-%d-%Y")
OutDirectory="$(basename $OutputFilePath)"
echo "cleaning up $OutputFilePath directory"
cd $OutputFilePath
cd ..
echo "Out Dir name $OutDirectory"
mv $OutDirectory $OutDirectory_$Timestamp
tar -czf $OutDirectory_$Timestamp.tar.gz $OutDirectory_$Timestamp
