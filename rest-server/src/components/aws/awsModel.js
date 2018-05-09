import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-west-1'
});

export const s3GetSignedURL = (payload) => {
  try{
    const s3 = new aws.S3();
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: payload.filename,
      Expires: 180,
      ContentType: payload.fileType
    };
    const signedUrl = s3.getSignedUrl('putObject', params);
    return signedUrl;
  } catch (err){
    return(err);
  }
}