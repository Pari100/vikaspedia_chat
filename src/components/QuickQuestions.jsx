import './QuickQuestions.css';

const QuickQuestions = ({ questions, onQuestionClick }) => {
  return (
    <div className="quick-questions">
      <p className="quick-questions__label">Quick questions:</p>
      <div className="quick-questions__grid">
        {questions.map((question, index) => (
          <button
            key={index}
            className="quick-questions__button"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;
