// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var color = require('colors');

AWS.config.loadFromPath('./src/aws-config.json');

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket
var params = {
    Bucket: 'js-aws-sdk-s3-test-' + uuid.v4(), /*bucketName required */
    ACL: 'private',
    CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1'
    }
};

s3.createBucket(params, function (err, data) {
    if (err) {
        console.log(JSON.stringify(err).red);
    }
    else {
        console.log(data); /* { Location: 'http://js-aws-sdk-s3-test-e8dc3060-01aa-493c-8856-a9e1274f4423.s3.amazonaws.com/' } */
        console.log((params.Bucket + ' => created successfully.').green);

        //putObject in the bucket
        var paramsObject = {
            Body: `{
                'Name': 'Jogendra'
            }`,
            Bucket: params.Bucket,
            Key: "js-aws-buckect-test-data"
        };

        s3.putObject(paramsObject, function (err, data) {
            if (err) {
                console.log(JSON.stringify(err).red);
            }
            else {
                console.log(data); /*{ ETag: '"49a97a066a1df9a4237e37acc382fe9b"' }*/
                console.log((paramsObject.Key + ' => added to bucket successfully.').green);
            }
        });
    }
});
