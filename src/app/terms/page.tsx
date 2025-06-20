export const dynamic = "force-dynamic";
import Header from "@/components/shared/Header";

export default async function TermsPage() {
  return (
    <>
        <Header />
      <section
        className="
        lg:w-[940px] mx-auto 
        lg:mb-[120px] 
        lg:my-[160px] 
        md:w-[684px] 
        w-[335px] 
        md:mt-[140px] 
        md:mb-[147px] 
        mt-[130px] 
        mb-[200px] 
        flex flex-col 
        gap-[30px]
        text-[var(--color-white)]
        "
      >
        <h1>서비스 이용약관</h1>
        <p>
          본 이용약관은 사용자가 본 서비스를 이용함에 있어 필요한 권리, 의무 및
          책임사항을 규정함을 목적으로 합니다.
        </p>
        <div>
          <h2>제1조 (목적)</h2>
          <p>
            이 약관은 서비스를 제공하는 운영자와 이용자 간의 서비스 이용 조건 및
            절차, 운영자와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을
            규정함을 목적으로 합니다.
          </p>
        </div>
        <div>
          <h2>제2조 (정의)</h2>
          <ul>
            <li>
              &quot;서비스&quot;란 운영자가 제공하는 웹사이트, 모바일 앱 등
              일체의 플랫폼을 의미합니다.
            </li>
            <li>
              &quot;이용자&quot;란 본 약관에 따라 운영자가 제공하는 서비스를
              받는 회원 및 비회원을 말합니다.
            </li>
          </ul>
        </div>

        <div>
          <h2>제3조 (약관의 효력 및 변경)</h2>
          <p>
            운영자는 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해
            게시합니다.
          </p>
        </div>
        <div>
          <h2>제4조 (이용자의 의무)</h2>
          <ul>
            <li>서비스 이용 시 관련 법령 및 약관을 준수하여야 합니다.</li>
            <li>
              타인의 권리를 침해하거나 서비스 운영을 방해해서는 안 됩니다.
            </li>
          </ul>
        </div>

        <div>
          <h2>제5조 (서비스의 제공 및 변경)</h2>
          <p>
            운영자는 운영상, 기술상의 필요에 따라 서비스를 변경하거나 일시
            중단할 수 있습니다.
          </p>
        </div>

        <div>
          <h2>제6조 (면책조항)</h2>
          <p>
            운영자는 천재지변, 이용자의 귀책사유 등 불가항력적인 사유로 인해
            발생한 손해에 대해 책임을 지지 않습니다.
          </p>
        </div>

        <p>최종 업데이트일: 2025-06-11</p>
      </section>
    </>
  );
}
