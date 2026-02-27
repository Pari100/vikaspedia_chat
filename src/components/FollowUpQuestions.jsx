import './FollowUpQuestions.css';

const FollowUpQuestions = ({ questions, onQuestionClick }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="follow-up-questions">
      <p className="follow-up-questions__label">Related Questions:</p>
      <div className="follow-up-questions__list">
        {questions.map((question, index) => (
          <button
            key={index}
            className="follow-up-questions__button"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FollowUpQuestions;
