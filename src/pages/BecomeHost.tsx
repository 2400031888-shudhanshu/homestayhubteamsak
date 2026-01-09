import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import NavigationHeader from "@/components/NavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, MapPin, Bed, DollarSign, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const hostSchema = z.object({
  propertyName: z.string().trim().min(3, "Property name must be at least 3 characters").max(100),
  propertyType: z.string().min(1, "Please select a property type"),
  propertyLocation: z.string().trim().min(3, "Location must be at least 3 characters").max(200),
  propertyDescription: z.string().trim().min(20, "Description must be at least 20 characters").max(2000),
  numRooms: z.number().min(1, "At least 1 room required").max(50),
  pricePerNight: z.number().min(1, "Price must be at least $1").max(10000)
});

const amenitiesList = [
  "WiFi", "Kitchen", "Parking", "Pool", "Air Conditioning", 
  "Heating", "Washer", "Dryer", "TV", "Workspace",
  "Garden", "Balcony", "Ocean View", "Mountain View", "Pet Friendly"
];

const BecomeHost = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    propertyLocation: "",
    propertyDescription: "",
    numRooms: 1,
    pricePerNight: 50,
    amenities: [] as string[]
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to become a host");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
    } else {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      hostSchema.parse(formData);
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

    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("host_applications").insert({
      user_id: user.id,
      property_name: formData.propertyName,
      property_type: formData.propertyType,
      property_location: formData.propertyLocation,
      property_description: formData.propertyDescription,
      num_rooms: formData.numRooms,
      price_per_night: formData.pricePerNight,
      amenities: formData.amenities
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to submit application. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
              Application Submitted!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for applying to become a host. We'll review your property and get back to you within 2-3 business days.
            </p>
            <Link to="/">
              <Button variant="adventure" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-adventure" />
              <span className="text-adventure font-medium tracking-wider uppercase text-sm">Share Your Space</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-foreground mb-4">
              Become a Host
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Open your doors to travelers from around the world and create unforgettable experiences
            </p>
          </div>

          <Card className="shadow-premium border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                Property Details
              </CardTitle>
              <CardDescription>
                Tell us about your property and what makes it special
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="propertyName">Property Name</Label>
                    <Input
                      id="propertyName"
                      placeholder="Cozy Mountain Retreat"
                      value={formData.propertyName}
                      onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    />
                    {errors.propertyName && <p className="text-sm text-destructive">{errors.propertyName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">Entire House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="room">Private Room</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="cabin">Cabin</SelectItem>
                        <SelectItem value="cottage">Cottage</SelectItem>
                        <SelectItem value="bungalow">Bungalow</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.propertyType && <p className="text-sm text-destructive">{errors.propertyType}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyLocation" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="propertyLocation"
                    placeholder="Bali, Indonesia"
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                  />
                  {errors.propertyLocation && <p className="text-sm text-destructive">{errors.propertyLocation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyDescription">Description</Label>
                  <Textarea
                    id="propertyDescription"
                    placeholder="Describe what makes your property unique, the neighborhood, and what guests can expect..."
                    rows={5}
                    value={formData.propertyDescription}
                    onChange={(e) => setFormData({ ...formData, propertyDescription: e.target.value })}
                  />
                  {errors.propertyDescription && <p className="text-sm text-destructive">{errors.propertyDescription}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="numRooms" className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      Number of Rooms
                    </Label>
                    <Input
                      id="numRooms"
                      type="number"
                      min={1}
                      max={50}
                      value={formData.numRooms}
                      onChange={(e) => setFormData({ ...formData, numRooms: parseInt(e.target.value) || 1 })}
                    />
                    {errors.numRooms && <p className="text-sm text-destructive">{errors.numRooms}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerNight" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price per Night (USD)
                    </Label>
                    <Input
                      id="pricePerNight"
                      type="number"
                      min={1}
                      max={10000}
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) || 1 })}
                    />
                    {errors.pricePerNight && <p className="text-sm text-destructive">{errors.pricePerNight}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" variant="adventure" size="lg" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;
