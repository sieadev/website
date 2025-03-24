package dev.siea.site.handlers;

import com.pixelservices.flash.components.ExpectedRequestParameter;
import com.pixelservices.flash.components.RequestHandler;
import com.pixelservices.flash.lifecycle.Request;
import com.pixelservices.flash.lifecycle.Response;
import com.pixelservices.flash.models.HttpMethod;
import com.pixelservices.flash.models.RouteInfo;
import com.pixelservices.logger.LoggerFactory;
import dev.siea.site.utils.ValidationUtil;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RouteInfo(endpoint = "/newsletter/signup", method = HttpMethod.POST)
public class NewsLetterSignupHandler extends RequestHandler {
    private final ExpectedRequestParameter email;

    public NewsLetterSignupHandler(Request req, Response res) {
        super(req, res);
        email = expectedRequestParameter("email");
    }

    @Override
    public Object handle() {
        String encodedEmail = this.email.getString();
        String email = URLDecoder.decode(encodedEmail, StandardCharsets.UTF_8);

        if (!ValidationUtil.validateEmail(email)) {
            res.status(400);
            return "Email " + email + " is not valid";
        }

        LoggerFactory.getLogger(this.getClass()).info("Email " + email + " has been signed up for the newsletter");

        return "Email " + email + " has been signed up for the newsletter";
    }
}
