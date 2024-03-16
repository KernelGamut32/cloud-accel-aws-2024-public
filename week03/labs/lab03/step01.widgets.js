const {
  S3Client,
  ListObjectsV2Command
} = require('@aws-sdk/client-s3');

// In the following code we are using AWS JS SDK v3
// See https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html
const S3 = new S3Client({});
const bucketName = process.env.BUCKET;

exports.main = async function (event, context) {
  try {
    const method = event.httpMethod;
    // Get name, if present
    const widgetName = event.path.startsWith('/') ? event.path.substring(1) : event.path;

    if (method === "GET") {
      // GET / to get the names of all widgets
      if (event.path === "/") {
        const data = await S3.send(new ListObjectsV2Command({ Bucket: bucketName }));
        const body = {
          widgets: data.Contents == null ? [] : data.Contents.map(function (e) { return e.Key })
        };
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify(body)
        };
      }
    }

    // Received an invalid operation
    return {
      statusCode: 400,
      headers: {},
      body: "We only accept GET, not " + method
    };
  } catch (error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: body
    }
  }
}