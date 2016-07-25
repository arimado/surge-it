

// STATE

var currentNormalisedState = [];

// FUNCTIONS
// GOAL: show updated data on state that is beyond a boundary

var addDataToCurrentState = function (newUnormalisedData, previousNormalisedData) {

    // get range boundary of the current dataSet

    // starting from that boundary we need to do create data points
        // what normalise data does is when it encounters no data within the range it just deuplicates the previous

    var start = getBoundary(previousNormalisedData)
    // returns maybe a time in milliseconds

    var newNormalisedData = normalise(newUnormalisedData, normaliseInterval);

    // returns normalised data
    // can i just get 2 normalised data's and concat them with each other


    // if start of new data is beyond end of boundary
    // then fill in the gaps
        // get the last data point and duplicate till you hit the startRang
        // of new data

    return previousNormalisedData.concat(newNormalisedData);
}


var normaliseData = function () {

}
