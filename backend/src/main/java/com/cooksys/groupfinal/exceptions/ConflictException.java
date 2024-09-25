package com.cooksys.groupfinal.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ConflictException extends RuntimeException {

    private static final long serialVersionUID = 1561556089244174980L;

    private String message;

}
