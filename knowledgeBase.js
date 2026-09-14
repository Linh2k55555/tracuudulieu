// knowledgeBase.js
// Cập nhật dữ liệu SAPD (San Andreas Police Department) + Bảng Luật San Andreas
// Dựa trên tài liệu Training lý thuyết mới nhất và file Luật.xlsx gốc.

const sapdHandbook = `
===== TÀI LIỆU TRAINING LÝ THUYẾT SAPD =====

### 1. GIỚI THIỆU CHUNG VỀ SAPD
- SAPD là lực lượng thực thi pháp luật DUY NHẤT có thẩm quyền tuần tra trên toàn bộ Tiểu bang San Andreas.
- SAPD có trách nhiệm bảo vệ, giữ gìn an ninh trật tự, bảo đảm an toàn cho cư dân; đồng thời tiếp nhận, xác minh và xử lý các đơn tố cáo, khiếu nại của cư dân theo đúng quy định.
- SAPD thực thi pháp luật trên toàn Tiểu bang San Andreas trong phạm vi thẩm quyền và khu vực do Ban Chỉ huy quy định. Mọi Sĩ quan khi thi hành công vụ phải tuân thủ phân khu tuần tra, chỉ thị điều phối, quyền hợp pháp của cư dân và các giới hạn thẩm quyền áp dụng cho từng tình huống cụ thể.

### 2. CHAIN OF COMMAND (RANKS) & THẨM QUYỀN
Callsign: 400 - 499
- Chief of Police: Chỉ huy cao nhất; định hướng toàn bộ SAPD.
- Assistant Chief: Điều hành thay Chief; giám sát Command.
- Deputy Chief: Quản lý hoạt động và kỷ luật toàn lực lượng.
- Commander: Chỉ huy phân khu/đơn vị; phê duyệt nghiệp vụ.
- Captain: Quản lý ca trực, nhân sự và huấn luyện.
- Lieutenant: Supervisor hiện trường; xử lý escalation.
- Sergeant: Giám sát tuần tra; hỗ trợ quyết định chiến thuật.
- Corporal: Hỗ trợ Supervisor; kiểm tra tác phong.
- Senior Officer: Sĩ quan kỳ cựu; mentor và hỗ trợ FTO.
- Officer: Sĩ quan độc lập; tuần tra và xử lý vụ việc.
- Solo Cadet: Tuần tra độc lập có giới hạn; báo cáo Supervisor.
- Cadet: Học viên; hoạt động dưới giám sát FTO.

### 3. PHẠM VI THẨM QUYỀN & NGUYÊN TẮC
- SAPD thực thi pháp luật trên toàn Tiểu bang San Andreas trong phạm vi thẩm quyền và khu vực do Ban Chỉ huy quy định.
- Cayo Perico Island: Sĩ quan SAPD KHÔNG được tự ý tiếp nhận, phản hồi tín hiệu 911 hoặc thực hiện nhiệm vụ tại Cayo Perico Island khi chưa có chỉ thị hoặc sự cho phép từ cấp có thẩm quyền. Khi Cayo Perico được mở phạm vi thẩm quyền cho SAPD, mọi Sĩ quan tham gia phải tuyệt đối tuân theo sự phân công của Dispatch/Supervisor, phạm vi nhiệm vụ được giao và các quy định riêng áp dụng tại khu vực này. Mọi hoạt động ngoài phạm vi được cho phép hoặc tự ý triển khai lực lượng tại Cayo Perico đều được xem là vượt thẩm quyền và sẽ bị xử lý theo quy định nội bộ SAPD.

### 4. RESPONSE CODE (CÒI PD)
- Còi 1 — THEO DẤU / GIÁM SÁT: Áp dụng khi đối tượng bỏ chạy nhưng mức nguy hiểm chưa cao. Theo dấu khoảng 5–10 phút, giữ visual và báo radio liên tục. Không PIT, không bắn; ưu tiên an toàn và xác minh tình huống.
- Còi 2 — PIT / CAN THIỆP CHIẾN THUẬT: Nếu đối tượng tiếp tục bỏ chạy sau giai đoạn Còi 1 hoặc mức nguy hiểm tăng, chuyển Còi 2. Cho phép PIT khi đủ điều kiện an toàn và đúng quy định; Supervisor có quyền cho phép hoặc dừng PIT.
- Còi 3 — TRIỆT HẠ PHƯƠNG TIỆN: Khi pursuit kéo dài khoảng 30 phút trở lên hoặc nguy cơ tăng cao, Supervisor có thể nâng Còi 3. Có thể cho phép bắn lốp để vô hiệu hóa phương tiện; không bắn người trong xe nếu chưa đủ điều kiện sử dụng lethal force. Chỉ thực hiện khi góc bắn an toàn, tránh dân thường/đồng đội và phải báo radio rõ ràng.
- Code 4 — CLEAR: Tình huống đã kiểm soát, không cần thêm đơn vị; trở về kênh/phân khu đang phục vụ.
- NGUYÊN TẮC: Thời gian là mốc tham khảo; Supervisor có thể nâng/hạ Còi sớm hơn theo mức độ nguy hiểm thực tế.

### 5. 10-CODE & RADIO
10-Code được sử dụng nhằm bảo đảm việc liên lạc trên radio ngắn gọn, thống nhất và chính xác. Khi phát đàm, Sĩ quan phải nêu rõ callsign, mã hoặc tình huống, vị trí, hướng di chuyển và yêu cầu hỗ trợ nếu cần.
Các tình huống Officer Down, nổ súng và truy đuổi được ưu tiên trên sóng radio. Sĩ quan không được chiếm sóng bằng nội dung không cần thiết, trao đổi cá nhân hoặc thông tin không liên quan đến nhiệm vụ đang diễn ra.

Bảng mã:
- 10-00: OFFICER DOWN, ALL UNITS! (Sĩ quan bị hạ, các đơn vị đến ứng cứu gấp).
- 10-04: Copy That! (Đã rõ, đã nhận thông tin).
- 10-06: Out of service / unavailable. (Tạm ngưng phục vụ / kết thúc ca trực).
- 10-07: Break at headquarters. (Nghỉ ngơi tại trụ sở).
- 10-08: In-service / available at work. (Đang phục vụ / bắt đầu ca trực).
- 10-10: Fight in progress. (Xảy ra ẩu đả, đánh nhau).
- 10-14: The injured / suspect is being detained on the way to the hospital. (Người bị thương / Nghi phạm đang bị giam giữ trên đường đến bệnh viện).
- 10-19: Return to the Headquarter. (Quay về trụ sở).
- 10-24: Backup needed (Specify the number of units and location). (Cần hỗ trợ - Chỉ định số lượng đơn vị và vị trí).
- 10-26: Vehicle traffic stop. (Dừng xe kiểm tra / xử lý vi phạm giao thông).
- 10-29: Vehicle felony stop. (Dừng xe trọng tội / phương tiện nguy hiểm).
- 10-31: In Pursuit. (Đang truy đuổi - Xe / Chạy bộ).
- 10-32: Shot Fired. (Có người cầm súng / Nổ súng xảy ra).
- 10-45: Suspected vehicles with prohibited substances. (Nghi vấn phương tiện có chất cấm).
- 10-52: Ambulance Requested. (Cần sự hỗ trợ từ EMS).
- 10-55: The driver has an alcohol / drug concentration. (Tài xế có nồng độ cồn / chất cấm).
- 10-56: Passenger have an alcohol / drug concentration. (Hành khách có nồng độ cồn / chất cấm).
- 10-71: Ask the supervisor to come to the scene. (Yêu cầu cấp trên (Supervisor) đến hiện trường).
- 10-96: Suspect in custody. (Nghi phạm bị giam giữ).
- 10-112: Impersonating. (Giả mạo người khác / nhân viên Chính Phủ).

### 6. QUY TẮC ỨNG XỬ & GIAO TIẾP
- LÀM VIỆC VỚI NGƯỜI DÂN: Khi On Duty, Sĩ quan phải mặc đúng đồng phục theo quy định, mang đầy đủ huy hiệu/thẻ ngành và bật Bodycam trong những trường hợp bắt buộc. Khi tiếp xúc hoặc làm việc với cư dân, Sĩ quan phải giới thiệu tên hoặc callsign, thông báo rõ lý do làm việc và duy trì thái độ bình tĩnh, chuyên nghiệp, rõ ràng, tôn trọng. Nghiêm cấm các hành vi cột nhà, xúc phạm, khiêu khích, đe dọa, gây áp lực không cần thiết hoặc lợi dụng chức vụ, quyền hạn để làm quyền đối với cư dân.
- LÀM VIỆC VỚI TỘI PHẠM: Khi làm việc với nghi phạm, Sĩ quan phải ưu tiên kiểm soát tình huống bằng mệnh lệnh bằng lời nói, duy trì khoảng cách và lựa chọn vị trí an toàn trước khi sử dụng biện pháp mạnh hơn. Chỉ được sử dụng mức vũ lực tối thiểu cần thiết và phải tương xứng với mức độ chống đối, hành vi nguy hiểm hoặc mối đe dọa thực tế từ đối tượng. Khi đối tượng đã được kiểm soát và không còn khả năng gây nguy hiểm, Sĩ quan phải chấm dứt việc sử dụng vũ lực, tiến hành còng tay, kiểm tra thương tích, yêu cầu EMS khi cần thiết và lập báo cáo đầy đủ về tình huống. Mọi hành vi lạm dụng vũ lực, sử dụng vũ lực vượt mức cần thiết hoặc cố tình bỏ qua quy trình đều được xem là vi phạm nghiêm trọng và sẽ bị xử lý kỷ luật theo quy định nội bộ SAPD.

### 7. TRAFFIC STOP & FELONY STOP
#### 7.1. TRAFFIC STOP (Quy trình dừng xe thông thường)
- Quan sát & báo radio: Xác định biển số, loại phương tiện, số lượng người trên xe, vị trí và hướng di chuyển; cập nhật radio khi cần thiết.
- Bố trí phương tiện: Dừng xe tuần tra phía sau phương tiện mục tiêu ở khoảng cách an toàn, lựa chọn vị trí phù hợp và sử dụng hệ thống đèn ưu tiên theo tình huống.
- Tiếp cận phương tiện: Tiếp cận từ phía an toàn, duy trì quan sát liên tục và đặc biệt chú ý đến tay, hành động của người lái và hành khách.
- Làm việc với người điều khiển: Giới thiệu tên hoặc callsign, thông báo rõ lý do dừng xe và yêu cầu xuất trình các giấy tờ cần thiết theo quy định.
- Kiểm tra & xử lý: Tiến hành kiểm tra thông tin trên MDT và xử lý bằng nhắc nhở, cảnh cáo hoặc ticket phù hợp với hành vi vi phạm.
- Kết thúc Traffic Stop: Trả lại đầy đủ giấy tờ, thông báo kết quả xử lý, hướng dẫn người điều khiển tiếp tục di chuyển và chỉ kết thúc Traffic Stop khi bảo đảm khu vực an toàn.

#### 7.2. FELONY STOP (Dừng xe trọng tội / nguy cơ cao)
1. Xác nhận tình huống & báo radio: Xác định rõ lý do thực hiện Felony Stop, thông báo vị trí, phương tiện, số lượng nghi phạm và tình trạng hiện tại cho Dispatch/Supervisor.
2. Thiết lập đội hình: Ưu tiên tối thiểu 03 Sĩ quan. Bố trí các phương tiện tuần tra tạo vùng che chắn an toàn, duy trì khoảng cách phù hợp và tuyệt đối tránh tạo làn bắn chéo giữa các đơn vị.
3. Ra khẩu lệnh: Sử dụng loa hoặc khẩu lệnh rõ ràng, thống nhất. Yêu cầu người điều khiển tắt máy, bỏ chìa khóa và thực hiện đúng hướng dẫn để lần lượt ra khỏi phương tiện. Không để nhiều đối tượng rời xe cùng lúc nếu chưa kiểm soát được tình huống.
4. Khống chế & kiểm tra: Khống chế, còng tay và khám xét từng đối tượng theo thứ tự. Chỉ tiến hành tiếp cận và kiểm tra phương tiện sau khi đã xác định những người trên xe được kiểm soát và khu vực đủ an toàn.
5. Chuyển sang Pursuit khi cần: Nếu phương tiện không chấp hành và tiếp tục bỏ chạy, chấm dứt đội hình Felony Stop, chuyển sang Pursuit và áp dụng quy trình Còi 1 – Còi 2 – Còi 3 theo tình hình thực tế.
*LƯU Ý: Felony Stop là tình huống có mức độ nguy hiểm cao. Cadet/Solo Cadet phải tuân theo chỉ đạo của FTO hoặc Supervisor, không được tự ý chỉ huy hoặc triển khai đội hình khi chưa nắm vững quy trình. Mọi Sĩ quan phải duy trì liên lạc radio, nhận diện mục tiêu rõ ràng và ưu tiên an toàn của đồng đội, cư dân và chính bản thân mình.*

### 8. KHÁM XÉT (SEARCH)
1. Căn cứ & thông báo: Sĩ quan phải xác định căn cứ khám xét hợp lệ theo quy định của server và tình huống thực tế. Khi điều kiện an toàn cho phép, phải thông báo cho đối tượng biết lý do và phạm vi khám xét trước khi tiến hành.
2. Phạm vi khám xét: Việc khám xét người, phương tiện hoặc khu vực chỉ được thực hiện trong phạm vi phù hợp với căn cứ ban đầu. Không được tự ý mở rộng phạm vi khám xét nếu chưa xuất hiện tình tiết mới, căn cứ bổ sung hoặc chỉ thị phù hợp từ cấp có thẩm quyền.
3. Thực hiện khám xét: Trước khi khám xét, phải bảo đảm đối tượng đã được kiểm soát và khu vực đủ an toàn. Sử dụng vị trí che chắn hợp lý, kiểm tra lần lượt và hạn chế tối đa việc làm thất lạc, thay đổi vị trí hoặc gây nhầm lẫn tang vật.
4. Tang vật & báo cáo: Tang vật vi phạm phải được tịch thu, ghi nhận và đưa vào hồ sơ vụ việc theo đúng quy trình. Báo cáo phải ghi rõ từng vật chứng được phát hiện ở người nào, phương tiện nào hoặc tại vị trí nào để bảo đảm tính minh bạch và khả năng đối chiếu.
*LƯU Ý: Cố tình che giấu, bỏ qua, tiêu hủy hoặc không ghi nhận tang vật vi phạm; tự ý mở rộng phạm vi khám xét không có căn cứ; hoặc làm sai lệch thông tin vật chứng đều có thể bị xem xét xử lý kỷ luật nội bộ SAPD.*

### 9. BẮT GIỮ & TẠM GIỮ
1. Thông báo bắt giữ: Khi tiến hành bắt hoặc tạm giữ, Sĩ quan phải thông báo rõ cho đối tượng biết tình trạng đang bị bắt/tạm giữ và lý do chính. Chỉ sử dụng còng tay khi có căn cứ phù hợp hoặc cần thiết để bảo đảm an toàn cho Sĩ quan, đối tượng và những người xung quanh.
2. Căn cứ giam giữ: Có thể tạm giữ khi có hành vi phạm tội, bằng chứng hoặc căn cứ hợp lý, hoặc khi cần thêm thời gian xác minh, điều tra theo quy định của server. Nghiêm cấm lợi dụng việc tạm giữ để gây áp lực, ép buộc đối tượng hoặc cố tình kéo dài tình huống RP không cần thiết.
3. Đọc quyền Miranda: Quyền Miranda phải được đọc trước khi bước vào giai đoạn hỏi cung hoặc xử lý chính thức đối với nghi phạm. Sau khi đọc, Sĩ quan phải xác nhận đối tượng đã nghe và hiểu quyền của mình trước khi tiếp tục.
4. Xử lý & bàn giao: Vi phạm hình sự: Đưa đối tượng về trụ sở để lập hồ sơ, xử lý tội danh và thực hiện thủ tục bàn giao nhà tù theo quy định. Vi phạm hành chính/giao thông: Tiến hành cảnh cáo hoặc lập ticket và giải phóng đối tượng khi không còn căn cứ tiếp tục giữ người. Tạm giữ phục vụ điều tra: Chỉ áp dụng khi thực sự cần thiết và không được vượt quá thời hạn mà server hoặc quy định nội bộ cho phép.
*LƯU Ý: Nếu SAPD áp dụng thời hạn tạm giữ 30–45 phút, khi hết thời hạn Sĩ quan phải đưa ra quyết định xử lý, chuyển sang thủ tục bắt giữ chính thức hoặc trả tự do cho đối tượng. Nghiêm cấm tạm giữ vô thời hạn, cố tình kéo dài thời gian hoặc giữ người khi không còn căn cứ hợp lệ. Vi phạm sẽ bị xem xét xử lý kỷ luật nội bộ SAPD.*

### 10. QUYỀN MIRANDA - SAPD
- Miranda được đọc khi nghi phạm đã bị bắt giữ và chuẩn bị bước vào giai đoạn xử lý, lấy lời khai hoặc hỏi cung chính thức. Không đọc ngay giữa hiện trường nếu tình huống chưa an toàn.
- Mẫu Miranda - SAPD: "Bạn đang bị bắt vì [tội danh]. Bạn có quyền giữ im lặng. Mọi nói của bạn có thể được sử dụng làm bằng chứng trong quá trình xử lý vụ việc. Bạn có quyền yêu cầu luật sư nếu cơ chế server hỗ trợ. Bạn có hiểu các quyền vừa được thông báo không?"
- Nguyên tắc quan trọng: Đọc rõ ràng, đầy đủ và với tốc độ phù hợp. Nghiêm cấm đọc qua nhanh hoặc khiến đối tượng không thể nghe, hiểu. Nếu tình huống còn nguy hiểm: ưu tiên khống chế, bảo đảm an toàn và ổn định tình hình trước. Nếu đối tượng không hiểu hoặc yêu cầu nhắc lại, phải giải thích hoặc đọc lại trong phạm vi hợp lý. Nếu đối tượng từ chối trả lời hoặc thực hiện quyền im lặng, ghi nhận trong báo cáo và xử lý. Không được ép buộc, đe dọa hoặc gây áp lực nhằm buộc đối tượng từ bỏ các quyền đã được thông báo.
- Quy trình Miranda: Bắt giữ -> Ổn định tình hình -> Đọc Miranda -> Xác nhận hiểu -> Hỏi cung / xử lý.
- LƯU Ý: Việc không đọc Miranda đúng quy trình hoặc vi phạm các quyền của nghi phạm có thể dẫn đến việc lời khai không được chấp nhận và sĩ quan bị xử lý kỷ luật nội bộ SAPD.

### 11. PURSUIT - TRUY ĐUỔI PHƯƠNG TIỆN
Nguyên tắc lực lượng: Ưu tiên tối đa 03 xe tuần tra + 01 mô tô theo đuôi đối với một phương tiện bỏ chạy, trừ trường hợp Supervisor đánh giá tình huống cần tăng, giảm hoặc thay đổi lực lượng tham gia. (Max 5 xe).
P.O.S — POSITION OF SEQUENCE
- POS 1 — PURSUER: Đơn vị trực tiếp bám theo phương tiện mục tiêu. Có trách nhiệm giữ visual, cập nhật vị trí, hướng di chuyển, tốc độ, tình trạng giao thông và các diễn biến quan trọng qua radio. Dẫn đội hình và thực hiện tactical intervention khi đủ điều kiện hoặc được cho phép.
- POS 2 — OBSERVER: Duy trì vị trí phía sau POS 1, hỗ trợ quan sát và truyền đạt radio khi cần. Theo dõi hành vi của phương tiện mục tiêu, môi trường xung quanh và sẵn sàng tiếp nhận POS 1 nếu đơn vị dẫn đầu mất visual, gặp sự cố hoặc cần rút khỏi pursuit.
- POS 3 — SUPPORTER: Giữ khoảng cách phù hợp phía sau đội hình, hạn chế gây ùn tắc hoặc va chạm giữa các đơn vị. Hỗ trợ block, điều tiết khu vực, tactical intervention hoặc các nhiệm vụ khác khi có chỉ thị.
NÂNG MỨC CÒI:
- Còi 1 — Theo dấu / Giám sát: Theo dấu khoảng 5–10 phút, ưu tiên duy trì visual và cập nhật radio. Không PIT, không bắn phương tiện.
- Còi 2 — Can thiệp chiến thuật: Áp dụng khi đối tượng tiếp tục bỏ chạy hoặc mức độ nguy hiểm tăng. Có thể thực hiện PIT khi đáp ứng điều kiện an toàn và đúng quy định.
- Còi 3 — Vô hiệu hóa phương tiện: Khi pursuit kéo dài khoảng 30 phút trở lên hoặc phương tiện tạo ra mối đe dọa nghiêm trọng, Supervisor có thể nâng Còi 3 và cho phép bắn lốp/vô hiệu hóa phương tiện theo quy định.
*LƯU Ý: Mọi thay đổi POS, đơn vị tham gia hoặc mức Còi phải được thông báo rõ trên radio. Khi qua giao lộ, khu vực đông dân hoặc tầm nhìn hạn chế, các đơn vị phải chủ động giảm tốc và ưu tiên an toàn, tránh để pursuit tạo thêm nguy hiểm không cần thiết cho cư dân và đồng đội.*

### 12. Còi 2 — PIT & CÒI 3 — TRIỆT HẠ
- Còi 2 — PIT: Sau giai đoạn Còi 1, nếu nghi phạm tiếp tục bỏ chạy, có hành vi lái xe nguy hiểm hoặc mức độ đe dọa tăng, Supervisor có thể nâng lên Còi 2. PIT chỉ được thực hiện khi tốc độ, mật độ giao thông và địa hình phù hợp, đồng thời khu vực va chạm không gây nguy hiểm quá mức cho cư dân, đồng đội hoặc những phương tiện khác.
- Còi 3 — TRIỆT HẠ PHƯƠNG TIỆN: Khi pursuit kéo dài khoảng 30 phút trở lên, hoặc phương tiện bỏ chạy tạo ra mối đe dọa đặc biệt nghiêm trọng, Supervisor có thể nâng lên Còi 3. Mục tiêu của Còi 3 là vô hiệu hóa khả năng tiếp tục di chuyển của phương tiện, không phải gây thương tích cho người bên trong xe.
- BẮN LỐP — Còi 3: Chỉ thực hiện khi được Supervisor cho phép hoặc tình huống thuộc trường hợp đã được SAPD quy định rõ. Mục tiêu ưu tiên là lốp/bánh xe của phương tiện; không cố tình nhắm vào cabin hoặc người trong xe khi chưa đủ điều kiện sử dụng lethal force. Không được khai hỏa nếu cư dân, đồng đội hoặc phương tiện khác nằm trong hướng bắn hoặc khu vực có nguy cơ trúng đạn. Phải lựa chọn vị trí và góc bắn an toàn trước khi thực hiện. Khi phương tiện đã dừng hoặc không còn khả năng tiếp tục bỏ chạy, ngừng bắn ngay và chuyển sang quy trình Felony Stop / Arrest.
- PIT MANEUVER: Chỉ thực hiện PIT khi điều kiện an toàn cho phép. Tránh PIT tại khu vực đông dân, giao lộ phức tạp, cầu hẹp, vực, trạm xăng hoặc nơi có mật độ giao thông cao. Không được liên tục thực hiện PIT một cách thiếu kiểm soát. Sau khi PIT thành công, các đơn vị phải chủ động block phương tiện, thiết lập đội hình và chuyển sang không chế/bắt giữ.
*LƯU Ý: Các mốc 5–10 phút đối với Còi 1 và khoảng 30+ phút đối với Còi 3 chỉ là mốc mặc định tham khảo. Supervisor có quyền nâng, hạ hoặc thay đổi mức Còi sớm hơn tùy vào mức độ nguy hiểm thực tế, hành vi của nghi phạm, điều kiện giao thông và sự an toàn của cư dân.*

### 13. USE OF FORCE - SỬ DỤNG VŨ LỰC
1. Cảnh báo & khẩu lệnh: Khi điều kiện an toàn cho phép, Sĩ quan phải ưu tiên sử dụng khẩu lệnh rõ ràng, dứt khoát và dễ hiểu trước khi áp dụng vũ lực, ví dụ: yêu cầu đối tượng dừng lại, bỏ vũ khí, giơ tay hoặc nằm xuống.
2. Sử dụng mức vũ lực phù hợp: Khi đối tượng chống đối, bỏ chạy, tấn công hoặc tạo ra mối đe dọa, Sĩ quan có thể tăng mức vũ lực để kiểm soát tình huống. Tuy nhiên, mọi biện pháp phải tương xứng với hành vi và mức độ nguy hiểm thực tế, đồng thời chỉ sử dụng mức vũ lực tối thiểu cần thiết.
PHÂN LOẠI VŨ LỰC:
- NON-LETHAL — Vũ lực không gây chết người: Ưu tiên sử dụng nhằm không chế đối tượng khi chưa xuất hiện mối đe dọa nghiêm trọng đến tính mạng.
- LETHAL — Vũ lực gây chết người: Chỉ được sử dụng khi Sĩ quan có căn cứ hợp lý cho rằng đối tượng đang tạo ra mối đe dọa trực tiếp và nghiêm trọng đến tính mạng của Sĩ quan hoặc người khác.
QUY TRÌNH SỬ DỤNG VŨ LỰC:
1. Đánh giá tình huống: Xác định hành vi, mức độ chống đối, vũ khí, khoảng cách và nguy cơ đối với những người xung quanh.
2. Khẩu lệnh / cảnh báo: Ra lệnh hoặc cảnh báo rõ ràng nếu tình huống và thời gian cho phép.
3. Non-Lethal: Áp dụng khi cần thiết để không chế đối tượng nhưng tình huống chưa đạt mức phải sử dụng lethal force.
4. Lethal Force: Chỉ sử dụng khi có mối đe dọa nghiêm trọng đến tính mạng và việc sử dụng lethal force là cần thiết để chấm dứt mối đe dọa đó.
5. Sau khi kiểm soát: Khi đối tượng không còn khả năng gây nguy hiểm, phải ngừng sử dụng vũ lực ngay, tiến hành còng tay, kiểm tra thương tích, yêu cầu EMS khi cần và lập báo cáo đầy đủ.
*LƯU Ý: Mọi mức vũ lực phải dựa trên mối đe dọa tại thời điểm xảy ra tình huống, không sử dụng vũ lực nhằm trừng phạt, trả đũa, thị uy. Việc tiếp tục sử dụng vũ lực sau khi đối tượng đã bị kiểm soát có thể bị xem là lạm dụng vũ lực và bị xử lý kỷ luật nội bộ SAPD.*

#### 13.1. VŨ LỰC KHÔNG CHẾT NGƯỜI (NON-LETHAL)
- Khái niệm: Non-Lethal là các công cụ, kỹ thuật hoặc biện pháp không chế được thiết kế nhằm kiểm soát đối tượng với nguy cơ gây tử vong thấp hơn so với lethal force.
- Điều kiện sử dụng: Ưu tiên áp dụng khi đối tượng không chấp hành, chống đối, bỏ chạy hoặc có hành vi nguy hiểm, nhưng chưa tạo ra mối đe dọa nghiêm trọng đến tính mạng. Mức độ sử dụng phải tương xứng với hành vi chống đối và tình hình thực tế. Khi điều kiện cho phép, Sĩ quan phải ra khẩu lệnh/cảnh báo trước khi sử dụng công cụ non-lethal.
- Các hình thức Non-Lethal có thể bao gồm: Khẩu lệnh và kiểm soát bằng lời nói. Không chế thể chất theo quy trình. Taser / súng điện. Dùi cui.
- Sau khi sử dụng: Phải ngừng sử dụng vũ lực ngay khi đối tượng đã được kiểm soát hoặc không còn chống đối. Không tiếp tục sử dụng Taser, dùi cui hoặc công cụ khác lên người đã bị còng, bất tỉnh hoặc không còn khả năng gây nguy hiểm. Tiến hành kiểm tra thương tích và yêu cầu EMS khi cần thiết. Những trường hợp sử dụng vũ lực đáng kể phải được ghi nhận trong báo cáo vụ việc.
*LƯU Ý: Non-Lethal không đồng nghĩa với hoàn toàn vô hại. Nghiêm cấm sử dụng công cụ không chế để trừng phạt, trả đũa, thị uy.*

#### 13.2. VŨ LỰC GÂY CHẾT NGƯỜI (LETHAL FORCE)
- Khái niệm: Lethal Force là việc sử dụng súng hoặc biện pháp có khả năng gây thương tích nghiêm trọng hoặc tử vong, được xem là mức vũ lực cao nhất trong quá trình thi hành công vụ.
- Điều kiện sử dụng: Chỉ được sử dụng khi Sĩ quan có căn cứ hợp lý cho rằng bản thân hoặc người khác đang đối mặt với mối đe dọa nghiêm trọng, trực tiếp và tức thời đến tính mạng, hoặc thuộc trường hợp đặc biệt đã được quy định rõ. Việc sử dụng Lethal Force phải nhằm chấm dứt mối đe dọa, không nhằm trừng phạt, trả đũa hoặc cố tình gây thương tích cho đối tượng.
- Một số tình huống có thể đủ điều kiện: Nghi phạm đang nổ súng về phía Sĩ quan hoặc người khác. Nghi phạm đang chĩa súng hoặc vũ khí có khả năng gây chết người và có khả năng thực hiện hành vi tấn công ngay lập tức. Nghi phạm cố tình sử dụng phương tiện như một vũ khí, lao vào Sĩ quan, cư dân hoặc khu vực đông người với nguy cơ gây thương vong nghiêm trọng.
- Còi 3 — BẮN LỐP / VÔ HIỆU HÓA PHƯƠNG TIỆN: Việc bắn lốp trong Còi 3 vẫn được xem là sử dụng súng, vì vậy phải tuân thủ nghiêm ngặt các yêu cầu về an toàn. Chỉ được thực hiện khi Supervisor cho phép hoặc thuộc trường hợp SAPD đã quy định rõ. Mục tiêu là lốp/bánh xe nhằm vô hiệu hóa khả năng di chuyển của phương tiện. Chỉ khai hỏa khi có góc bắn an toàn, không có cư dân hoặc đồng đội trong hướng bắn. Nghiêm cấm cố tình bắn xuyên cabin, nhằm vào người trong xe hoặc khai hỏa vào khu vực đông người khi chưa đủ điều kiện sử dụng Lethal Force đối với con người. Khi phương tiện đã dừng hoặc không còn khả năng tiếp tục bỏ chạy, phải ngừng bắn ngay và chuyển sang quy trình Felony Stop/Arrest.
*LƯU Ý: Khi mối đe dọa đã chấm dứt, quyền sử dụng Lethal Force cũng chấm dứt. Mọi trường hợp sử dụng súng phải có thể giải trình dựa trên mối đe dọa thực tế tại thời điểm xảy ra tình huống và được ghi nhận đầy đủ trong báo cáo SAPD.*

### 14. XỬ LÝ NGHI PHẠM (BOOKING)
Booking là bước xử lý sau khi nghi phạm đã được kiểm soát và đưa về khu vực xử lý. Mục đích là xác nhận danh tính, tang vật, tội danh, mức phạt, thời gian giam giữ và hoàn tất hồ sơ/bàn giao theo quy định.
1. Khám xét lần cuối: Kiểm tra lại người nghi phạm trước khi đưa vào khu giam. Xác định vũ khí, chất cấm, tài sản hoặc vật chứng liên quan. Mọi tang vật vi phạm phải được tịch thu, ghi nhận và xử lý đúng quy định.
2. Xác nhận danh tính & hồ sơ: Kiểm tra CCID/MDT để xác nhận thông tin cá nhân. Kiểm tra tình trạng truy nã, tiền án, lệnh liên quan hoặc các thông tin cần thiết cho vụ việc. Đảm bảo thông tin được ghi nhận đúng đối tượng, tránh nhầm CCID hoặc hồ sơ.
3. Đọc tội danh: Thông báo rõ cho nghi phạm từng tội danh/cáo buộc được áp dụng. Nếu nghi phạm yêu cầu, Sĩ quan có thể giải thích ngắn gọn căn cứ của từng tội. Không tự ý thêm tội danh khi không có căn cứ hoặc bằng chứng phù hợp.
4. Áp dụng hình phạt: Tính ticket, mức phạt và thời gian giam theo bảng luật hiện hành. Không tự ý tăng hoặc giảm hình phạt ngoài phạm vi được quy định. Việc giảm án, giảm tiền phạt hoặc áp dụng tình tiết giảm nhẹ chỉ được thực hiện khi quy định SAPD cho phép.
5. Hoàn tất & bàn giao: Hoàn thiện hồ sơ vụ việc và cập nhật đầy đủ thông tin trên MDT. Bàn giao nghi phạm vào khu giam hoặc nhà tù theo đúng tội danh và thời gian xử lý. Đảm bảo tang vật, hồ sơ và thông tin liên quan đã được ghi nhận trước khi kết thúc Booking.
*LƯU Ý: Booking phải được thực hiện rõ ràng, chính xác và minh bạch. Nghiêm cấm cố tình ghi sai CCID, thêm/bớt tội danh, bỏ qua tang vật hoặc điều chỉnh hình phạt vì mục đích cá nhân. Những sai phạm trong quá trình Booking có thể bị xem xét kỷ luật nội bộ SAPD.*

### 15. BÁO CÁO (REPORTING)
1. Thông tin chung: Thời gian và địa điểm xảy ra vụ việc. Callsign, họ tên hoặc đơn vị của các Sĩ quan tham gia. Tên/CCID của nghi phạm hoặc các bên liên quan. Phương tiện liên quan, biển số và đặc điểm nhận dạng nếu có.
2. Diễn biến vụ việc: Trình bày sự việc theo thứ tự thời gian, từ thời điểm tiếp nhận tình huống đến khi kết thúc. Ghi rõ các quy trình đã áp dụng nếu có như Traffic Stop, Pursuit, Còi 1–2–3, PIT, Felony Stop, Arrest hoặc Booking. Nếu có sử dụng vũ lực, phải ghi rõ loại vũ lực, lý do sử dụng, diễn biến dẫn đến việc sử dụng và thời điểm chấm dứt vũ lực.
3. Tang vật & bằng chứng: Liệt kê đầy đủ vũ khí, chất cấm, tài sản hoặc vật chứng thu giữ. Ghi rõ tang vật được phát hiện ở người, phương tiện hoặc địa điểm nào. Ghi nhận các nguồn chứng cứ liên quan như Bodycam, CCTV, hình ảnh, video, nhân chứng hoặc dữ liệu MDT.
4. Kết quả xử lý: Liệt kê các tội danh được áp dụng. Ghi rõ ticket, mức phạt và thời gian giam giữ. Ghi nhận tang vật đã tịch thu hoặc bàn giao. Nêu tình trạng cuối cùng của nghi phạm và việc hỗ trợ EMS nếu có.
5. Kết luận & kiểm tra: Báo cáo phải sử dụng ngôn ngữ khách quan, rõ ràng và dựa trên sự việc thực tế. Không đưa suy đoán, cảm xúc hoặc nhận định cá nhân không có căn cứ vào hồ sơ. Trước khi nộp, phải kiểm tra lại CCID, biển số, thời gian, số liệu, tang vật và tội danh để tránh sai sót.
*NGUYÊN TẮC: Báo cáo SAPD phải đủ chi tiết để một người không có mặt tại hiện trường vẫn có thể hiểu được: Ai liên quan? Chuyện gì đã xảy ra? Xảy ra ở đâu và khi nào? Có những bằng chứng nào? SAPD đã xử lý vụ việc ra sao?*
*Lưu ý: Cadet/Solo Cadet nên nhờ FTO hoặc Supervisor kiểm tra báo cáo trước khi nộp nếu chưa chắc về tội danh, tang vật hoặc trình tự nghiệp vụ.*
`;

const lawTable = `
===== BẢNG LUẬT SAN ANDREAS =====

I. LUẬT GIAO THÔNG
- GT01: Không đội mũ bảo hiểm (nếu xe máy) - Phạt: 500.0
- GT02: Vượt đèn đỏ - Phạt: 50.0
- GT03: Lái xe quá tốc độ (60 km/h thành phố, 100 ngoài thành phố, 120 cao tốc.) - Phạt: 5-10/100, 10-20/200, 20-30/300, 30 trở lên/500 (KHÔNG CỘNG DỒN)
- GT04: Lái xe khi say xỉn - Phạt: 150.0
- GT05: Lái xe không bằng lái - Phạt: 500.0
- GT06: Đỗ xe sai quy định - Phạt: 300.0
- GT07: Gây tai nạn bỏ trốn - Phạt: 600.0
- GT08: Lái xe không đúng làn đường - Phạt: 100.0
- GT09: Không chấp hành hiệu lệnh - Phạt: 500.0, Thời gian phạt: Chỉ khi nào phạm luật hình sự 5 THÁNG
- GT10: Lái xe không an toàn - Phạt: 50.0
- GT11: Phương tiện không đủ điều kiện lưu thông - Phạt: 300.0
- GT12: Chạy xe bằng 1 bánh - Phạt: 200.0
- GT13: Lái xe gây tai nạn - Phạt: 400.0
- GT14: Lái xe ngược chiều - Phạt: 150.0
- GT15: Lấn chiếm lòng lề đường - Phạt: 300.0

II. LUẬT HÌNH SỰ
- HS01: Tàng trữ vũ khí trái phép - Phạt: 1000.0. Mô tả: Nếu không có giấy phép/20 viên đạn ghép thêm +1 lần tội. Thời gian phạt: 20 THÁNG (có thể giảm)
- HS02: Buôn bán vũ khí - Phạt: 2000-5000. Mô tả: 2-5 cây. Thời gian phạt: 30-45 THÁNG (có thể giảm)
- HS03: Cướp tài sản - Phạt: 2000.0. Mô tả: Có thể truy tố đồng phạm. Thời gian phạt: 30 THÁNG (có thể giảm)
- HS04: Bắt cóc - Phạt: 2000.0. Mô tả: Đặc biệt nghiêm trọng. Thời gian phạt: 30 THÁNG (có thể giảm)
- HS05: Phá hoại tài sản - Phạt: 3000.0. Mô tả: Phá hoại. Thời gian phạt: 10-30 tháng (đền bù)
- HS06: Gây rối trật tự công cộng - Phạt: 500-4000. Mô tả: Đe dọa người khác hoặc ẩu đả, gây tai nạn... Thời gian phạt: 60 THÁNG (có thể giảm)
- HS07: Chống người thi hành công vụ khi bị bắt giữ - Phạt: 2000-5000. Mô tả: Không hợp tác, bỏ trốn khi đã bị còng bị bắt,... Thời gian phạt: 45-70 THÁNG (có thể giảm)
- HS08: Trộm cắp / Lừa đảo - Phạt: 1500-5000. Mô tả: Tùy theo giá trị tài sản. Thời gian phạt: 15-60 THÁNG
- HS09: Lẩn tránh liều lĩnh - Phạt: 500.0. Mô tả: Quá trình chạy gây nguy hiểm cho người đi đường (đâm đụng, phá hoại tài sản, bay bổng,...). Thời gian phạt: 20 THÁNG
- HS10: Buôn lậu - Phạt: 1200.0. Mô tả: Chở các chuyến hàng lậu. Thời gian phạt: 50 THÁNG (không giảm)
- HS11: Khai thác bãi cấm - Phạt: 1000-1500. Mô tả: Khai thác gỗ lậu, khu vực khoáng sản lậu. Thời gian phạt: 40 THÁNG (không giảm)
- HS12: Cản trở người thi hành công vụ - Phạt: 1000.0. Mô tả: Ngăn cản người thi hành công vụ bắt tội phạm, cố ý khai sai,... Thời gian phạt: 30 tháng (có thể giảm)
- HS13: Quấy rối - Phạt: 10000.0. Mô tả: dùng lời nói, hành động để ... người khác. Thời gian phạt: 200 tháng
- HS14: Cố ý phá hoại tài sản chính phủ - Phạt: 3000.0. Mô tả: Đập phá xe PD, EMS,... Thời gian phạt: 60 tháng (có thể giảm)
- HS15: Phi tang đồ phạm pháp / Áp dụng khi giam luôn cả xe (5000) - Phạt: 5000 (ticket riêng). Mô tả: Không phối hợp giao, cố ý phi tang xe nghi ngờ có vật chứng,... Thời gian phạt: 45 tháng (có thể giảm)
- HS16: Xúc phạm sĩ quan hòa bình - Phạt: 1000-10.000. Mô tả: Xúc phạm!. Thời gian phạt: 30-70 tháng
- HS17: Không hợp tác khi bắt giữ - Phạt: 1000.0. Mô tả: Cố ý che đậy, không phối hợp giao ra chứng cứ phạm tội. Thời gian phạt: 15 tháng
- HS18: Hối lộ sĩ quan - Phạt: 1000.0. Mô tả: Có ý đồ hối lộ, mua chuộc. Thời gian phạt: 40 tháng
- HS19: Tổ chức đua xe bất hợp pháp - Phạt: 2000.0. Thời gian phạt: 20 tháng
- HS20: Khiêu khích vô lý - Phạt: 5000.0. Mô tả: Khiêu khích qua sđt, lời nói, hành động,... Thời gian phạt: 60 tháng
- HS21: Dùng công cụ quay bất hợp pháp - Phạt: 500.0. Mô tả: Body cam phải to, rõ, đủ điều kiện (không thể nói là quay lén như thú bông, mắt kính quay phim,...). Thời gian phạt: Không tính là chứng cứ !!
- HS22: Bất tuân hiệu lệnh - Phạt: 1000-3000. Mô tả: Bỏ chạy khi bị traffic, kiểm tra thông thường,... Thời gian phạt: 10-30 tháng
- HS23: Trồng - khai thác cần sa - Phạt: 5000 - 7000. Thời gian phạt: 40 tháng
- HS24: Buôn bán cần sa - Phạt: 4000 - 10000. Thời gian phạt: 40 - 60 tháng
- HS25: Cướp tạp hóa - Phạt: 2000 - 8000 (có cộng sao). Thời gian phạt: 40 tháng
- HS26: Tàng trữ chất cấm - Phạt: 6000-12000. Mô tả: Ma tuý,... Thời gian phạt: 30 - 60 tháng
- HS27: Tàng trữ cần sa quá số lượng - Phạt: Quá 1 cây 2000. Mô tả: Không được phép quá 2 (thu giữ hết trả lại đúng số lượng được phép giữ). Thời gian phạt: 10 - 50 Tháng
- HS28: Trộm/cướp xe - Phạt: 800.0. Mô tả: trộm/cướp xe. Thời gian phạt: 30 tháng
- HS29: Xâm nhập vùng cấm - Phạt: 300 – 800. Mô tả: Cá nhân và phương tiện có hành vi cố ý đi vào hoặc đậu xe, tiếp cận hoặc có mặt trái phép trong ranh giới bãi lậu. Thời gian phạt: Yêu cầu rời khỏi khu vực ngay lập tức, tịch thu công cụ và đồ cấm nếu có, nếu trên người nhiều đồ cấm thì có thể bị [giam 15-20 tháng]
- HS30: Hỗ trợ backup chặn xe - Phạt: 200.0. Mô tả: Hỗ trợ chặn xe trong tình huống truy đuổi. Thời gian phạt: 10 tháng

III. LUẬT HÀNH CHÍNH
- HC01: Không xuất trình giấy tờ (CMND/Bằng lái) - Hình phạt: Xử phạt hành chính
- HC02: Kinh doanh không giấy phép - Hình phạt: Áp dụng cho các tiệm mở tự phát
- HC03: Tụ tập đông người trái phép - Phạt: 500/người. Mô tả: Không thông báo hoặc gây ảnh hưởng
- HC04: Gây mất trật tự nơi công cộng - Phạt: 1200 - Nếu vẫn cố chối cãi 15 tháng. Mô tả: Gây mất trật tự nơi công cộng
- HC05: Lăng mạ, xúc phạm người khác nơi công cộng - Phạt: 500-2000. Mô tả: Kèm theo cảnh cáo bằng lời
- HC06: Làm hành động thiếu văn minh nơi công cộng - Phạt: 3000.0. Thời gian phạt: 30 tháng (có thể giảm)
- HC07: Xe không đăng kiểm theo quy định (những loại xe đặc biệt, siêu xe,...) - Phạt: 5000 áp dụng giam xe. Mô tả: Không đăng kiểm theo đúng quy định (đổi màu không đăng kiểm, đổi biển xe,...) thay đổi số điện thoại cũng phải cập nhập lại !!
- HC08: Tiếp tay cho tội phạm - Phạt: 4000 áp dụng giam xe / người nếu là công cụ. Mô tả: Cho người phạm tội mượn xe, công cụ,...

IV. TRỌNG TỘI (FELONIES)
- TT01: Giết người có chủ đích - Phạt: 5000-15.000. Mô tả: Làm bị thương nạn nhân xong nhưng tiếp tục truy sát đến cùng !!!. Thời gian phạt: 70 - 300 THÁNG
- TT02: Cướp ngân hàng - Phạt: 5000.0. Mô tả: Kèm truy nã toàn thành phố. Thời gian phạt: 30 THÁNG
- TT03: Tấn công cơ quan công quyền - Phạt: 5000- 10.000. Mô tả: Tấn công bằng phương tiện, nổ súng vào lực lượng,... Gây ảnh hưởng tính mạng. Thời gian phạt: 60 - 300 THÁNG
- TT04: Khủng bố, đe dọa an ninh - Phạt: 5000.0. Mô tả: Đặt bom, tấn công diện rộng, uy hiếp thành phố. Thời gian phạt: 120 - 300 THÁNG
- TT05: Bắt cóc người có chức vụ - Phạt: 10000.0. Mô tả: Ví dụ: cảnh sát, bác sĩ, luật sư... Thời gian phạt: 80 - 300 THÁNG
- TT06: Buôn bán vũ khí quy mô lớn - Phạt: 20000.0. Mô tả: khẩu súng hoặc vũ khí cấm. Thời gian phạt: 70 - 300 Tháng
- TT07: Buôn bán ma túy quy mô lớn - Phạt: 100000.0. Mô tả: Trên 50 đơn vị ma túy hoặc nhiều loại. Thời gian phạt: 600 THÁNG
- TT08: Rửa tiền - Mô tả: Giao dịch bất hợp pháp, mua bán tài sản không rõ nguồn gốc. Thời gian phạt: 55 THÁNG
- TT09: Đào tẩu khỏi trại giam (cướp tù) - Phạt: 50000.0. Mô tả: Cướp hoặc đào tẩu (TỔNG TẤT CẢ TỘI) - TRUY NÃ TỚI KHI BẮT ĐƯỢC. Thời gian phạt: TỔNG THỜI GIAN THỤ + THÊM 40 THÁNG (NẾU CƯỚP 150 THÁNG)
- TT10: Gián điệp/Phản quốc - Phạt: ?. Mô tả: Rất nghiêm trọng, cần xử lý bởi cấp cao. Thời gian phạt: TỬ HÌNH CẤM KHỎI NGÀNH VĨNH VIỄN
- TT11: Mưu sát nhân viên chính phủ - Phạt: Tùy mức độ. Mô tả: Tấn công lực lượng UPD, EMS. Thời gian phạt: Tối đa 600 tháng
- TT12: Buôn bán vũ khí có tổ chức - Phạt: 40.000-70.000 Tuỳ quy mô tổ chức. Thời gian phạt: Tối đa 100- 400 tháng
- TT13: Lừa đảo nghiêm trọng (trên 5000) - Phạt: 10.000-30.000 Tuỳ quy mô tổ chức. Mô tả: Bồi thường đủ tiền mới bắt đầu thi hành án. Thời gian phạt: 150 - 300 tháng
- TT14: Giả dạng sĩ quan - Phạt: 5000.0. Mô tả: Giả dạng (tuỳ mức độ lừa đảo). Thời gian phạt: 120-200 tháng
- TT15: Khiêu khích trực tiếp không lý do [CB] - Phạt: 1.000 - 5000. Mô tả: Nẹt pô, nẹt ga, bốc đầu, chạy quá tốc độ ngay trước Đồn cảnh sát. Thời gian phạt: Dưới 200 tháng
`;

// Kết hợp cả hai tài liệu thành một ngữ cảnh duy nhất cho AI
const fullContext = `
Bạn là một trợ lý AI chuyên nghiệp của Sở Cảnh Sát San Andreas (SAPD).
Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng dựa HOÀN TOÀN vào thông tin được cung cấp dưới đây.
Tuyệt đối không tự bịa ra thông tin nằm ngoài tài liệu. Nếu không tìm thấy thông tin, hãy trả lời "Tôi không tìm thấy thông tin này trong tài liệu SAPD hoặc Bảng Luật."
Luôn trả lời bằng tiếng Việt, với thái độ chuyên nghiệp, tôn trọng và tuân thủ quy định của SAPD.

Dưới đây là Tài liệu Training lý thuyết SAPD:
${sapdHandbook}

Dưới đây là Bảng Luật San Andreas (Dùng để tra cứu mức phạt, thời gian giam giữ):
${lawTable}
`;

module.exports = {
    fullContext
};