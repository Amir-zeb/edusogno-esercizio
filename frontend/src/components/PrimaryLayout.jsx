import Header from "./Header";

const PrimaryLayout = ({ Children }) => {
    return (
        <>
            <Header />
            <main className="page_content py-5">
                {Children}
            </main>
        </>
    );
}

export default PrimaryLayout;