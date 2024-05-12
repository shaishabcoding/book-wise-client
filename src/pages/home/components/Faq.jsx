const Faq = () => {
  const faqs = [
    {
      question: "How can I borrow books from the library?",
      answer:
        "To borrow books, you need to first create an account on our website. Once logged in, you can search for books using the search bar, select the book you want, and click on the 'Borrow' button. Follow the prompts to complete the borrowing process.",
    },
    {
      question: "How many books can I borrow at a time?",
      answer:
        "Currently, you can borrow up to 5 books at a time. However, this limit may vary depending on your membership type and the library's policies. Please refer to our membership guidelines for more information.",
    },
    {
      question: "How long can I keep borrowed books?",
      answer:
        "The standard borrowing period is 3 weeks. You can renew your books online if no one else has placed a hold on them. Please note that overdue fines may apply if you fail to return books by their due date.",
    },
    {
      question: "Can I reserve books that are currently checked out?",
      answer:
        "Yes, you can place a hold on books that are currently checked out by other members. Once the book becomes available, you will receive an email notification, and the book will be reserved for you for a limited time.",
    },
    {
      question: "How do I return books?",
      answer:
        "You can return books either in person at the library's circulation desk during operating hours or via the book drop box located outside the library. Please make sure to return books on or before the due date to avoid overdue fines.",
    },
    {
      question: "Can I suggest new books for the library?",
      answer:
        "Absolutely! We welcome suggestions for new books to add to our collection. You can submit your book recommendations through the 'Suggest a Book' section on our website. Our librarians will review your suggestions and consider adding them to our catalog.",
    },
    {
      question: "How can I renew my library membership?",
      answer:
        "You can renew your library membership by visiting the library in person or by contacting our circulation desk. Alternatively, you may also be able to renew your membership online through your account dashboard, depending on your membership type.",
    },
  ];

  return (
    <div className="px-4 lg:px-0 mb-4 md:mb-10">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        FAQ
      </h2>
      <div className="join join-vertical w-full">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="collapse collapse-arrow join-item border border-base-300 dark:bg-gray-600 dark:text-white dark:border-gray-400"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-700 dark:text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
