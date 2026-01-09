import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageSquare, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000)
});

const Contact = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      contactSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) fieldErrors[error.path[0] as string] = error.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      user_id: user?.id || null
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Message sent successfully!");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-nature/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-nature" />
            </div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Message Sent!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <Button variant="adventure" size="lg" onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="shadow-warm border-0 hover:shadow-premium transition-smooth">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-adventure/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-adventure" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm">support@homestayhub.com</p>
                    <p className="text-muted-foreground text-sm">hosts@homestayhub.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-warm border-0 hover:shadow-premium transition-smooth">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-trust/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-trust" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground text-sm">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-warm border-0 hover:shadow-premium transition-smooth">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-nature/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-nature" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground text-sm">123 Travel Street</p>
                    <p className="text-muted-foreground text-sm">San Francisco, CA 94102</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-warm border-0 hover:shadow-premium transition-smooth">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-warmth/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-warmth" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                    <p className="text-muted-foreground text-sm">We typically respond</p>
                    <p className="text-muted-foreground text-sm">within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 shadow-premium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="adventure" size="lg" className="w-full h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
