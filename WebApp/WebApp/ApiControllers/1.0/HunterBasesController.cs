using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts.BLL.App;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.App.EF;
using Domain.App;
using Domain.App.Identity;
using Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using PublicApi.DTO.v1.Mappers;
using V1DTO=PublicApi.DTO.v1;

namespace WebApp.ApiControllers._1._0
{
    /// <summary>
    /// HunterBases Api Controller
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class HunterBasesController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly UserManager<Domain.App.Identity.AppUser> _userManager;
        private readonly HunterBaseMapper _mapper = new HunterBaseMapper();

        public HunterBasesController(AppDbContext context, IAppBLL bll, UserManager<AppUser> userManager)
        {
            _bll = bll;
            _userManager = userManager;
        }

        // GET: api/HunterBases
        /// <summary>
        /// Get all HunterBases
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<PublicApi.DTO.v1.HunterBase>>> GetHunterBases()
        {
            return Ok((await _bll.HunterBases.GetAllAsync()).Select(e => _mapper.Map(e)));
        }

        // GET: api/HunterBases/5
        /// <summary>
        /// Get Specific HunterBase
        /// </summary>
        /// <returns></returns>
        [Route("base")]
        [HttpGet]
        [Produces("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<V1DTO.HunterBase>))]
        public async Task<ActionResult<PublicApi.DTO.v1.HunterBase>> GetHunterBase()
        {
            return (await _bll.HunterBases.GetAllAsync()).Select(e => _mapper.Map(e)).First(e => e.AppUserId == User.UserId());
        }
        
        // GET: api/HunterBases/homeBase/5
        /// <summary>
        /// Get Specific HunterBase
        /// <param name="hunterBaseId"></param>
        /// </summary>
        /// <returns></returns>
        [HttpGet("{hunterBaseId}")]
        [Produces("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<V1DTO.HunterBase>))]
        public async Task<ActionResult<PublicApi.DTO.v1.HunterBase>> GetHunterHomeBase(Guid hunterBaseId)
        {
            return _mapper.Map(await _bll.HunterBases.FirstOrDefaultAsync(hunterBaseId));
        }
        

        // PUT: api/HunterBases/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Update Camapign, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <param name="hunterBase"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(V1DTO.MessageDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(V1DTO.MessageDTO))]
        public async Task<IActionResult> PutHunterBase(Guid id, V1DTO.HunterBase hunterBase)
        {
            if (id != hunterBase.Id)
            {
                return BadRequest(new V1DTO.MessageDTO("id and HunterBase.id do not match"));
            }

            await _bll.HunterBases.UpdateAsync(_mapper.Map(hunterBase));
            await _bll.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/HunterBases
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Create new HunterBase. only for admins
        /// </summary>
        /// <param name="HunterBase"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces("application/json")]
        [Consumes("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(V1DTO.HunterBase))]
        public async Task<ActionResult<HunterBase>> PostHunterBase(V1DTO.HunterBase HunterBase)
        {
            var bllEntity = _mapper.Map(HunterBase);
            _bll.HunterBases.Add(bllEntity);
            await _bll.SaveChangesAsync();
            HunterBase.Id = bllEntity.Id;

            return CreatedAtAction("GetHunterBase",
                new {id = HunterBase.Id, version = HttpContext.GetRequestedApiVersion()?.ToString() ?? "0"},
                HunterBase);
        }

        // DELETE: api/HunterBases/5
        /// <summary>
        /// Delete HunterBase, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        public async Task<ActionResult<HunterBase>> DeleteHunterBase(Guid id)
        {
            var HunterBase= await _bll.HunterBases.FirstOrDefaultAsync(id);
            if (HunterBase== null)
            {
                return NotFound(new V1DTO.MessageDTO("HunterBase not found"));
            }

            await _bll.HunterBases.RemoveAsync(HunterBase);
            await _bll.SaveChangesAsync();

            return StatusCode(204);
        }
    }
}
