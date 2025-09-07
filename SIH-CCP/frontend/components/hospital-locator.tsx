import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useLanguage } from './language-context';
import { Badge } from './ui/badge';

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  rating: number;
  isOpen: boolean;
  specialties: string[];
  openHours: string;
}

const HospitalLocator: React.FC = () => {
  const { t } = useLanguage();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<string>('');

  useEffect(() => {
    // Simulate getting user location and fetching nearby hospitals
    const fetchHospitals = async () => {
      setLoading(true);
      
      // Mock hospital data
      setTimeout(() => {
        const mockHospitals: Hospital[] = [
          {
            id: '1',
            name: 'City Veterinary Hospital',
            address: '123 Main Street, Downtown',
            distance: 2.5,
            phone: '+91-9876543210',
            rating: 4.8,
            isOpen: true,
            specialties: ['Large Animals', 'Emergency Care', 'Surgery'],
            openHours: '24/7'
          },
          {
            id: '2',
            name: 'Rural Animal Care Center',
            address: '456 Farm Road, Suburbs',
            distance: 5.2,
            phone: '+91-9876543211',
            rating: 4.5,
            isOpen: true,
            specialties: ['Cattle', 'Dairy Management', 'Breeding'],
            openHours: '8:00 AM - 8:00 PM'
          },
          {
            id: '3',
            name: 'Advanced Livestock Clinic',
            address: '789 Agricultural Avenue, Outskirts',
            distance: 8.1,
            phone: '+91-9876543212',
            rating: 4.7,
            isOpen: false,
            specialties: ['Reproductive Health', 'Nutrition', 'Preventive Care'],
            openHours: '9:00 AM - 6:00 PM'
          },
          {
            id: '4',
            name: 'Emergency Animal Hospital',
            address: '321 Healthcare Blvd, Medical District',
            distance: 12.3,
            phone: '+91-9876543213',
            rating: 4.9,
            isOpen: true,
            specialties: ['Emergency', 'Critical Care', 'Surgery'],
            openHours: '24/7'
          },
          {
            id: '5',
            name: 'Countryside Veterinary Services',
            address: '654 Village Road, Rural Area',
            distance: 15.7,
            phone: '+91-9876543214',
            rating: 4.3,
            isOpen: true,
            specialties: ['Farm Visits', 'Herd Health', 'Vaccinations'],
            openHours: '7:00 AM - 7:00 PM'
          }
        ];

        setHospitals(mockHospitals.sort((a, b) => a.distance - b.distance));
        setUserLocation('Current Location (GPS)');
        setLoading(false);
      }, 1500);
    };

    fetchHospitals();
  }, []);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleDirections = (address: string) => {
    // In a real app, this would open Google Maps or similar
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
  };

  const getDistanceColor = (distance: number) => {
    if (distance < 5) return 'text-green-600';
    if (distance < 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t('nearbyHospitals')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Finding nearby hospitals...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t('nearbyHospitals')}
          </CardTitle>
          {userLocation && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Navigation className="h-4 w-4" />
              {userLocation}
            </p>
          )}
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground">{hospital.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                    <div className={`text-sm font-medium ${getDistanceColor(hospital.distance)}`}>
                      {hospital.distance} km
                    </div>
                  </div>
                </div>

                {/* Status and Hours */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${hospital.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={hospital.isOpen ? 'text-green-600' : 'text-red-600'}>
                      {hospital.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{hospital.openHours}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1">
                  {hospital.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(hospital.phone)}
                    className="flex items-center gap-1"
                  >
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDirections(hospital.address)}
                    className="flex items-center gap-1"
                  >
                    <Navigation className="h-3 w-3" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Notice */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5"></div>
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
                Emergency Situations
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                For immediate veterinary emergencies, call the nearest 24/7 hospital directly. 
                Signs of emergency include difficulty breathing, severe bleeding, inability to stand, 
                or sudden collapse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalLocator;