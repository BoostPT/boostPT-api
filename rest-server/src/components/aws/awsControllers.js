import { s3GetSignedURL } from './awsModel';

export const awsS3Controller = async (req,res) => {
  try{
    const signedUrl = await s3GetSignedURL(req.body);
    return res.status(200).send(signedUrl);
  }catch (err){
    return (err.message);
  }
}