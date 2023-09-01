package com.azizzakiryarov.awsimageupload.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSCredentialsConfig {

    @Bean
    public AWSCredentialsProvider awsCredentialsProvider() {
        return new ProfileCredentialsProvider();
    }

    @Bean
    public AmazonS3 s3() {

        String accessKey = awsCredentialsProvider().getCredentials().getAWSAccessKeyId();
        String secretKey = awsCredentialsProvider().getCredentials().getAWSSecretKey();

        System.out.println(accessKey);
        System.out.println(secretKey);

        AWSCredentials awsCredentials = new BasicAWSCredentials(
                accessKey,
                secretKey);

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}