package com.azizzakiryarov.awsimageupload.backet;

public enum BucketName {

    PROFILE_IMAGE("azizzakiryarov-image-upload");

    private final String backetName;

    BucketName(String backetName) {
        this.backetName = backetName;
    }

    public String getBacketName() {
        return backetName;
    }
}