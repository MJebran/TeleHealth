using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeleHealthAPI.Models
{
    public partial class Response
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Case")]
        public int CaseId { get; set; }

        [Required]
        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }

        [Required]
        // [MaxLength(1000)]
        public string Response1 { get; set; } = null!;

        // [MaxLength(1000)]
        public string? Recommendation { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? CreatedAt { get; set; }

        [JsonIgnore]
        public virtual Case Case { get; set; } = null!;

        [JsonIgnore]
        public virtual User Doctor { get; set; } = null!;
    }
}
