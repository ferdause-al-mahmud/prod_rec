import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Faq = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out-quad',
      once: true,
    });
  }, []);

  const faqItems = [
    {
      question: "What is this platform about?",
      answer: "Our platform is designed to help users post their queries and receive personalized product recommendations from others based on their needs."
    },
    {
      question: "How does the recommendation system work?",
      answer: "Users can recommend products for queries posted by others, including details like product name, image, and reasons for the recommendation."
    },
    {
      question: "How can I recommend a product?",
      answer: "Visit the query details page and fill out the recommendation form to suggest a product."
    },
    {
      question: "Can I update or delete my recommendations?",
      answer: "Yes, you can manage your recommendations in the 'My Recommendations' section."
    },
    {
      question: "Is this platform free to use?",
      answer: "Yes, the platform is completely free for users to post queries and make or receive recommendations."
    }
  ];

  return (
    <div className="w-11/12 lg:w-5/6 mx-auto mt-20 py-20" data-aos="fade-up">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg">Everything you need to know about ProdRec</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <input 
              type="radio" 
              name="faq-accordion" 
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              <span className="inline-block mr-3 text-blue-600">Q:</span>
              {item.question}
            </div>
            <div className="collapse-content bg-white/50">
              <p className="text-gray-700 pt-4 leading-relaxed">
                <span className="inline-block mr-3 text-purple-600 font-bold">A:</span>
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center" data-aos="fade-up">
        <p className="text-gray-600 text-lg mb-6">Still have questions?</p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-purple-400/50 transition-all duration-300 transform hover:scale-105">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Faq;
