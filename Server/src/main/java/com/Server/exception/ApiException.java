package com.Server.exception;

import lombok.Getter;
import java.time.ZonedDateTime;

@Getter
public class ApiException {
    private final String message;
    private final ZonedDateTime timeStamp;

    public ApiException(String message, ZonedDateTime timeStamp) {
        this.message = message;
        this.timeStamp = timeStamp;
    }

}
