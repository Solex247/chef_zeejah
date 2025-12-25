import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ZeejahRecipe = (props) => {
  return (
    <>
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Zeejah Recommends:</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.recipe?.trimStart()}
        </ReactMarkdown>
      </section>
    </>
  );
};

export default ZeejahRecipe;
