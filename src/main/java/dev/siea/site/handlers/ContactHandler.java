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

@RouteInfo(endpoint = "/contact", method = HttpMethod.POST)
public class ContactHandler extends RequestHandler {
    private final ExpectedRequestParameter name;
    private final ExpectedRequestParameter email;
    private final ExpectedRequestParameter message;

    public ContactHandler(Request req, Response res) {
        super(req, res);
        name = expectedRequestParameter("name");
        email = expectedRequestParameter("email");
        message = expectedRequestParameter("message");
    }

    @Override
    public Object handle() {
        String encodedEmail = this.email.getString();
        String email = URLDecoder.decode(encodedEmail, StandardCharsets.UTF_8);

        String message = this.message.getString();

        if (!ValidationUtil.validateEmail(email)) {
            res.status(400);
            return "Email " + email + " is not valid";
        }

        LoggerFactory.getLogger(this.getClass()).info("Email " + email + " has sent a message: " + message);

        return 200;
    }
}
