const Faq = () => {
  return (
    <div className="w-5/6 mx-auto mt-20">
      <h1 className="text-5xl text-center font-bold mb-10">Queries About Us</h1>
      <div className="space-y-2">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            What is this platform about?
          </div>
          <div className="collapse-content">
            <p>
              Our platform is designed to help users post their queries and
              receive personalized product recommendations from others based on
              their needs.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How does the recommendation system work?{" "}
          </div>
          <div className="collapse-content">
            <p>
              Users can recommend products for queries posted by others,
              including details like product name, image, and reasons for the
              recommendation.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How can I recommend a product?
          </div>
          <div className="collapse-content">
            <p>
              Visit the query details page and fill out the recommendation form
              to suggest a product.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Can I update or delete my recommendations?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can manage your recommendations in the “My
              Recommendations” section.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Is this platform free to use?
          </div>
          <div className="collapse-content">
            <p>
              Yes, the platform is completely free for users to post queries and
              make or receive recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
