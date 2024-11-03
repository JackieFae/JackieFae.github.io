pushd montecarlo
del *.csv
popd
robocopy /s ../../../MonteCarlo/out/debug/ ./montecarlo
pushd ..
pushd ..
pushd ..
pushd MonteCarlo
pushd out
pushd debug
del *.csv
popd
popd
popd
popd
popd
popd
