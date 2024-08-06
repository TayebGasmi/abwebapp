package com.appointment.booking.utils;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;
import java.security.interfaces.RSAPublicKey;
import java.text.ParseException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GoogleTokenVerifier {

    private final Map<String, RSAPublicKey> publicKeys = new ConcurrentHashMap<>();
    @Value("${google.jwk.url}")
    private String googleJwkUrl;

    @PostConstruct
    private void loadPublicKeys() throws IOException, ParseException, JOSEException {
        var jwkSet = JWKSet.load(new URL(googleJwkUrl));
        for (var key : jwkSet.getKeys()) {
            var rsaKey = key.toRSAKey();
            publicKeys.put(key.getKeyID(), rsaKey.toRSAPublicKey());
        }
    }

    public JWTClaimsSet verify(String idToken) throws ParseException, JOSEException {
        var jwsObject = JWSObject.parse(idToken);
        var key = publicKeys.get(jwsObject.getHeader().getKeyID());

        if (key == null) {
            throw new IllegalArgumentException("Invalid key ID");
        }

        var verifier = new RSASSAVerifier(key);
        if (!jwsObject.verify(verifier)) {
            throw new IllegalArgumentException("Token verification failed");
        }
        return SignedJWT.parse(idToken).getJWTClaimsSet();
    }
}
