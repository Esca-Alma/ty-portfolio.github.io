// 経歴を路線図と駅として表現するコンポーネント
// 時間の順序がある職歴にのみ駅番号（01, 02, 03）と現在地カラー（#F2B705）を使用する。
import { routeStops } from "@/data/personal";

export default function RouteLine() {
  return (
    <div
      aria-label="キャリアの歩み（2017年〜現在）"
      className="bg-white border border-[#D3DADC] rounded-lg p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 mb-6 border-b border-[#D3DADC]">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="inline-block w-3 h-3 rounded-sm bg-[#12795A]"
          />
          <span className="font-display font-bold text-sm text-[#1E2A30]">
            Career Transit Line
          </span>
          <span className="text-xs text-[#58656C]">
            2017年からのキャリアの歩み
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#58656C]">
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full bg-[#F2B705] ring-2 ring-[#1E2A30]"
          />
          <span>黄色い駅は現在の所属</span>
        </div>
      </div>

      {/* PC・タブレット：横方向の路線図（路線バーの段には駅丸アイコンのみを置き、年号や「現在」バッジは下の段に分離して線と重ならないようにする） */}
      <div className="hidden md:block">
        <div className="relative">
          {/* 路線バー（実線＋右端の延伸を表す破線） */}
          <div
            aria-hidden="true"
            className="absolute top-[15px] left-4 right-16 h-1.5 bg-[#12795A] rounded-full route-line-animate"
          />
          <div
            aria-hidden="true"
            className="absolute top-[17px] right-2 w-14 border-t-2 border-dashed border-[#12795A]"
          />

          <ol className="relative grid grid-cols-3 gap-6">
            {routeStops.map((stop, idx) => {
              const stationNumber = String(idx + 1).padStart(2, "0");
              return (
                <li key={stop.year} className="pt-0">
                  {/* 1段目：路線バーの上に重なるのは駅の丸アイコンのみ */}
                  <div className="h-9 flex items-center">
                    <span
                      aria-hidden="true"
                      className={`relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full font-display font-bold text-xs border-2 shadow-xs ${
                        stop.current
                          ? "bg-[#F2B705] text-[#1E2A30] border-[#1E2A30] ring-4 ring-white"
                          : "bg-white text-[#1E2A30] border-[#12795A] ring-4 ring-white"
                      }`}
                    >
                      {stationNumber}
                    </span>
                  </div>

                  {/* 2段目：路線バーより下に年号と「現在」バッジを配置 */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-display font-bold text-sm px-2 py-0.5 rounded bg-[#F4F6F6] text-[#1E2A30] border border-[#D3DADC]">
                      {stop.year}年〜
                    </span>
                    {stop.current && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-[#F2B705] text-[#1E2A30]">
                        現在
                      </span>
                    )}
                  </div>

                  {/* 3段目：所属名と担当内容 */}
                  <p className="font-bold text-base text-[#1E2A30] mt-2 leading-snug">
                    {stop.title}
                  </p>
                  <p className="text-sm text-[#58656C] mt-1 leading-relaxed">
                    {stop.detail}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* スマートフォン：縦方向の路線図 */}
      <div className="md:hidden">
        <ol className="relative border-l-4 border-[#12795A] ml-3 space-y-6">
          {routeStops.map((stop, idx) => {
            const stationNumber = String(idx + 1).padStart(2, "0");
            return (
              <li key={stop.year} className="pl-5 relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[15px] top-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full font-display font-bold text-[11px] border-2 ${
                    stop.current
                      ? "bg-[#F2B705] text-[#1E2A30] border-[#1E2A30]"
                      : "bg-white text-[#1E2A30] border-[#12795A]"
                  }`}
                >
                  {stationNumber}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xs px-2 py-0.5 rounded bg-[#F4F6F6] text-[#1E2A30] border border-[#D3DADC]">
                    {stop.year}年〜
                  </span>
                  {stop.current && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-[#F2B705] text-[#1E2A30]">
                      現在
                    </span>
                  )}
                </div>
                <p className="font-bold text-base text-[#1E2A30] mt-1.5">
                  {stop.title}
                </p>
                <p className="text-sm text-[#58656C] mt-0.5 leading-relaxed">
                  {stop.detail}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
