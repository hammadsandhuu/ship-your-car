
export interface SubmitFormData {
  shippingType: string;
  freightType: string;
  serviceType: string;
  handlingType: string;
  packagingHelp: string;
  locationInput: string;
  deliveryAddress: string;
  containerType: string;
  readyTime: string;
  selectedDate: Date | null;
  selectedTime: string;
}

export const submitFreightForm = async (formData: SubmitFormData) => {
  try {
    // Simulate API call - replace with your actual backend endpoint
    const response = await fetch('/api/freight-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting freight form:', error);
    throw error;
  }
};
