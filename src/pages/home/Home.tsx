export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* data-test? https://docs.cypress.io/guides/references/best-practices */}
      <h1 className="text-3xl font-bold underline" data-test="home-msg">
        This is the homepage!
      </h1>
      <span className="mx-5 mt-5 text-gray-500">
        This is demo page that emphasizes simplicity while showcasing how
        features like an Admin Panel and the ability to chat directly with your
        database can be seamlessly integrated.
        <br /> In this preview, you can explore some basic navigation flows and
        envision how additional features can be customized to meet your business
        needs. needs.
      </span>
    </div>
  );
}
