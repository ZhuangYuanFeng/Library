var accessKey = '3hAuuyh7bz5mY2aJWrrZFl58CDPodVvaH39l_Cd2';
var secretKey = 'SpiEd7ABi_abwW7Xs_r9A4o6j2tVk8Zj1Ms69R0_';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
