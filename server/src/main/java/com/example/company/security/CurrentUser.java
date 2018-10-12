package com.example.company.security;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.*;

/*Spring security provides an annotation called @AuthenticationPrincipal to access the currently
authenticated user in the controllers.
The following CurrentUser annotation is a wrapper around @AuthenticationPrincipal annotation.
*/


@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal
public @interface CurrentUser {

}

/*
@Target annotation specifies which elements of our code can have annotations of the defined type.
    ElementType.TYPE—Can be applied to any element of a class

    ElementType.FIELD—Can be applied to a field

    ElementType.PARAMETER—Can be applied to method parameters

    ElementType.CONSTRUCTOR—Can be applied to constructors

    ElementType.LOCAL_VARIABLE—Can be applied to local variables

    ElementType.ANNOTATION_TYPE—Indicates that the declared type itself is an annotation type


@Retention this annotation sets the visibility of the annotation to which it is applied.
The visibility can be set for three different levels:
    Compilers

    Tools

    Runtime


@Documented is a meta-annotation. You apply @Documented when defining an annotation,
to ensure that classes using your annotation show this in their generated JavaDoc.

 */
