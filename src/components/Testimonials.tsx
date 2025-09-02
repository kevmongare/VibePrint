// components/Testimonials.jsx


const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The quality of their branded merchandise exceeded our expectations. Our clients loved the custom notebooks!",
      author: "Sarah Johnson",
      role: "Marketing Director, TechStart Inc.",
      avatar: "https://via.placeholder.com/50x50?text=SJ"
    },
    {
      id: 2,
      quote: "Quick turnaround and excellent customer service. Will definitely be ordering again for our next conference.",
      author: "Michael Chen",
      role: "Events Manager, Summit Solutions",
      avatar: "https://via.placeholder.com/50x50?text=MC"
    },
    {
      id: 3,
      quote: "The attention to detail on our custom apparel was impressive. Really captured our brand essence perfectly.",
      author: "Jessica Williams",
      role: "Brand Manager, Nova Enterprises",
      avatar: "https://via.placeholder.com/50x50?text=JW"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Clients Say</h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center">
                <img className="h-10 w-10 rounded-full" src={testimonial.avatar} alt={testimonial.author} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;