import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

export const s3GetSignedURL = (payload) => {
  console.log(payload);
  try{
    const s3 = new aws.S3();
    // const params = {
    //   Bucket: ,
    //   Key: ,
    //   Expires: 180,
    //   ContentType:
    // };

    const signedUrl = s3.getSignedUrl('putObject', params);
    console.log(signedUrl);
    return signedUrl;
  } catch (err){
    return(err);
  }
}